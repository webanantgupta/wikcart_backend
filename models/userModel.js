const db = require('../config/db');

const User = {
  create: (data, callback) => {
    const query = 'INSERT INTO users (name, email, password, google_id) VALUES (?, ?, ?, ?)';
    db.query(query, [data.name, data.email, data.password, data.google_id], callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }
};

module.exports = User;