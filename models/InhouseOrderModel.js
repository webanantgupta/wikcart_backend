const db = require("../config/db");




const inHouseOrderModel = {

create: (data, callback)=>{
const sql = `INSERT INTO inhouse_orders(order_code,customer_name,num_products,amount,status,is_new) VALUES (?,?,?,?,?,?);`;
 const values = [
      data.order_code,
      data.customer_name,
      data.num_products || 1,
      data.amount,
      data.status || "pending",
      data.is_new ?? 1
    ];
    db.query(sql, values, callback);
},
 //  GET ALL ORDERS
  getAll: (callback) => {
    const sql = `SELECT * FROM inhouse_orders ORDER BY id DESC`;
    db.query(sql, callback);
  },

  //  GET ORDER BY ID
  getById: (id, callback) => {
    const sql = `SELECT * FROM inhouse_orders WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  //  DELETE ORDER BY ID
  deleteById: (id, callback) => {
    const sql = `DELETE FROM inhouse_orders WHERE id = ?`;
    db.query(sql, [id], callback);
  }


}



module.exports = inHouseOrderModel