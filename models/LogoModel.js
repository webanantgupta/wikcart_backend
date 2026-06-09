const db = require("../config/db");



const logo = {
    getLogo:(callback)=>{
const sql = `SELECT * from logo_heading LIMIT  1`;
db.query(sql,[],callback);
    },
    updateLogo:(logo_name,callback)=>{
const sql = `UPDATE logo_heading SET logo_name= ? WHERE id = 1`;
db.query(sql,[logo_name],callback);
    }
}


module.exports = logo;