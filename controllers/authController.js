const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  User.create({ name, email, password: hashedPassword, google_id: null }, (err, result) => {
    if (err) return res.status(500).json({ message: "User already exists or DB error" });
    res.status(201).json({ message: "User registered successfully" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email: user.email } });
  });
};

// Google Auth Logic
exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, sub: google_id } = ticket.getPayload();

    User.findByEmail(email, (err, results) => {
      if (results.length > 0) {
        // User exists, log them in
        const jwtToken = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token: jwtToken, user: results[0] });
      } else {
        // New user from Google, create record
        User.create({ name, email, password: null, google_id }, (err, result) => {
          const jwtToken = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token: jwtToken, user: { name, email } });
        });
      }
    });
  } catch (error) {
    res.status(400).json({ message: "Google authentication failed" });
  }
};