const db = require("../config/db");
const crypto = require("crypto");

const ReferralModel = {

create:(data,callback)=>{

const uniqueString = crypto.randomBytes(4).toString("hex").toUpperCase();
const generatedCode = `REF-${uniqueString}`;

    const sql = `INSERT INTO referral(referrer_name,referred_name,referral_code) VALUES (?,?,?)`;
    const values = [
        data.referrer_name,
        data.referred_name,
    generatedCode
    ];

    db.query(sql,values,callback);


},

getAll:(callback)=>{
    const sql = `SELECT * FROM referral`;
    db.query(sql,callback);
}

}


module.exports = ReferralModel;