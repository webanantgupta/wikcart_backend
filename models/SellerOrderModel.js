const db = require("../config/db");

const sellerOrderModel = {

  // ✅ CREATE
  create: (data, callback) => {
    const sql = `
      INSERT INTO seller_orders
      (order_code, customer_name, is_guest, num_products, amount, order_status, payment_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.order_code,
      data.customer_name,
      data.is_guest ?? 0,
      data.num_products || 1,
      data.amount,
      data.order_status || "pending",
      data.payment_status || "unpaid"
    ];

    db.query(sql, values, callback);
  },

  // ✅ GET ALL
  getAll: (callback) => {
    const sql = `SELECT * FROM seller_orders ORDER BY id DESC`;
    db.query(sql, callback);
  },

  // ✅ GET BY ID
  getById: (id, callback) => {
    const sql = `SELECT * FROM seller_orders WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  // ✅ DELETE
  deleteById: (id, callback) => {
    const sql = `DELETE FROM seller_orders WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  // ✅ UPDATE STATUS
  updateStatus: (id, order_status, callback) => {
    const sql = `UPDATE seller_orders SET order_status = ? WHERE id = ?`;
    db.query(sql, [order_status, id], callback);
  }

};

module.exports = sellerOrderModel;