// const db = require("../config/db"); // Assuming your db connection is here

// const Commission = {
//   // Get the current active configuration
//   getSettings: async () => {
//   const rows = await db.execute("SELECT * FROM comission LIMIT 1");
// return rows[0];
//   },

//   // Update or Create the configuration
//   updateSettings: async (type, value) => {
//     const query = `
//       INSERT INTO comission (id, commission_type, comission_value)
//       VALUES (1, ?, ?)
//       ON DUPLICATE KEY UPDATE 
//       commission_type = VALUES(commission_type), 
//       commission_value = VALUES(commission_value)
//     `;
//     const [result] = await db.execute(query, [type, value]);
//     return result;
//   }
// };

// module.exports = Commission;


const db = require("../config/db");

const Commission = {

  // Get current commission settings
  getSettings: async () => {

    const [rows] = await db.promise().query(
      "SELECT * FROM comission LIMIT 1"
    );

    return rows[0];
  },

  // Update or insert commission settings
  updateSettings: async (type, value) => {

    const query = `
      INSERT INTO comission 
      (id, commision_type, comission_value)
      VALUES (1, ?, ?)

      ON DUPLICATE KEY UPDATE
      commision_type = VALUES(commision_type),
      comission_value = VALUES(comission_value)
    `;

    const [result] = await db.promise().query(query, [type, value]);

    return result;
  }

};

module.exports = Commission;