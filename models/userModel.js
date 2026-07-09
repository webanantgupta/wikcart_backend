const db = require("../config/db");

const User = {

  // Create User
  create: async (data) => {

    const query = `
      INSERT INTO users
      (
        full_name,
        email,
        password,
        role,
        google_id
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )
      RETURNING *;
    `;

    return await db.query(query, [
      data.full_name,
      data.email,
      data.password,
      data.role,
      data.google_id || null
    ]);
  },

  // Create Vendor
  createVendor: async (userId) => {

    const query = `
      INSERT INTO vendor_register
      (
        user_id
      )
      VALUES
      (
        $1
      )
      RETURNING *;
    `;

    return await db.query(query, [userId]);
  },

  // Find User By Email
  findByEmail: async (email) => {

    const query = `
      SELECT *
      FROM users
      WHERE email = $1
    `;

    return await db.query(query, [email]);
  }

};

module.exports = User;