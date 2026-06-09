const db = require("../config/db");



const CustomerRegisterModel = {

    create: (data, callback) => {
        const sql = `INSERT INTO customers_register(full_name,mobile_number,city,state,pincode,email,full_address,password_hash) VALUES (?,?,?,?,?,?,?,?)`;
        const values = [
            data.full_name,
            data.mobile_number,
            data.city,
            data.state,
            data.pincode,
            data.email,
            data.full_address,
            data.password_hash
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