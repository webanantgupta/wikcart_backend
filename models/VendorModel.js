const db = require("../config/db");


const Vendor = {

    //create
    create:(data,callback) =>{
        const sql = `INSERT INTO vendor_register (name,email,password,google_id) VALUES (?,?,?,?)`;
        const values = [
            data.name,
            data.email,
            data.password,
            data.google_id || null
        ]
        db.query(sql,values,callback);
    },

    //getAllVendors
    getAll:(callback)=>{
        const sql = `SELECT * FROM vendor_register`;
        db.query(sql,callback);
    },

    //getByID
    getById:(id,callback)=>{
        const sql = `SELECT * FROM vendor_register WHERE id = ?`;
        db.query(sql,[id],callback);
    },

    //getByEmail
getByEmail:(email,callback)=>{
    const sql = `SELECT * FROM vendor_register WHERE email = ?`;
    db.query(sql,[email],callback);
},

//deletebyid
deleteById:(id,callback)=>{
    const sql = `DELETE FROM vendor_register WHERE id = ?`
    db.query(sql,[id],callback);
}

}


module.exports = Vendor;

