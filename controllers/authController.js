const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  try {

    const {
      full_name,
      email,
      password,
      role
    } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingUser = await User.findByEmail(email);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role: role || "vendor",
      google_id: null
    });

    const user = result.rows[0];

    if (user.role === "vendor") {
      await User.createVendor(user.id);
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find user
    const result = await User.findByEmail(email);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

console.log("================================");
console.log("User:", user);
console.log("Entered Password:", password);
console.log("Stored Hash:", user.password);

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

console.log("Password Match:", isMatch);
console.log("Role:", user.role);
console.log("================================");

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if account is blocked
    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Google Auth Logic
exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const {
      name,
      email,
      sub: google_id,
    } = ticket.getPayload();

    // Check if user already exists
    const existingUser = await User.findByEmail(email);

    if (existingUser.rows.length > 0) {

      const user = existingUser.rows[0];

      const jwtToken = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        success: true,
        token: jwtToken,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // Create new Google user
    const result = await User.create({
      full_name: name,
      email,
      password: null,
      role: "customer", // or "vendor" if required
      google_id,
    });

    const user = result.rows[0];

    // Create vendor record only if role is vendor
    if (user.role === "vendor") {
      await User.createVendor(user.id);
    }

    const jwtToken = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      success: true,
      token: jwtToken,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error("Google Auth Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message,
    });
  }
};