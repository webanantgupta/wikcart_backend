const db = require("../config/db")


const CustomerModel = {

    create:(data,callback)=>{
        const sql = `INSERT INTO customer (image, name, uid, email, phone_no,order_count, status) VALUES (?,?,?,?,?,?,?)`;
        const values = [data.image, data.name, data.uid, data.email, data.phone_no , data.order_count ||0,data.status ||1];
        db.query(sql,values,callback);
    },

    getAll:(callback)=>{
        const sql =`SELECT * FROM customer`;
        db.query(sql,callback);
    },

    getById:(id,callback)=>{
        const sql = `SELECT * FROM customer where id = ?`;
        db.query(sql,[id],callback);
    }
}

module.exports = CustomerModel;