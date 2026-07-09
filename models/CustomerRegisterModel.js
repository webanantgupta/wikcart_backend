const db = require("../config/db");



const CustomerRegisterModel = {

    create: (data, callback) => {
        const sql = `INSERT INTO customers_register(mobile_number,city,state,pincode,full_address) VALUES (?,?,?,?,?)`;
        const values = [
            data.mobile_number,
            data.city,
            data.state,
            data.pincode,
            data.full_address
        ]
        db.query(sql,values,callback);
    },

    getAll:(callback) =>{
        const sql = `SELECT * FROM customers_register`;
        db.query(sql,callback);
    },

     loginCustomer: (email, callback) => {
        const sql = `SELECT * FROM customers_register WHERE email = ?`;
        db.query(sql, [email], callback);
    }

}



module.exports = CustomerRegisterModel;