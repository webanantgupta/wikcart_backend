const CustomerModel = require("../models/CustomerModel");
const db = require("../config/db");

exports.createCustomer = (req, res) => {
    try {
        const { image, name, uid, email, phone_no, order_count, status } = req.body;
        if (!name || !email || !phone_no) {
            return res.status(400).json({ message: "Name, email and phone no is required", success: false })
        }

        const data = {image, name, uid, email, phone_no, order_count, status };

        CustomerModel.create(data, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Server Error", error: error.message, success: false })
            }
            return res.status(201).json({ message: "customer Created Successfully", data: result, success: true })
        })
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message, success: false })
    }
}


exports.getAllCustomer = (req,res) =>{
    try {
        CustomerModel.getAll((err,result)=>{
          if (err) {
                return res.status(500).json({ message: "Server Error", error: error.message, success: false })
            }
            return res.status(200).json({ message: "All customer fetched Successfully", data: result, success: true })  
        })
    } catch (error) {
         return res.status(500).json({ message: "Server Error", error: error.message, success: false })
    }
}


exports.getCustomerById = (req,res) =>{
    try {
        const {id} =req.params;
        if(!id){
            return res.status(400).josn({message:"Id is required", success:false});
        }
        CustomerModel.getById(id,(err,result)=>{
              if (err) {
                return res.status(500).json({ message: "Server Error", error: error.message, success: false })
            }
            return res.status(200).json({ message: "Fetched Customer By Id Successfully", data: result, success: true })  
        })
    } catch (error) {
         return res.status(500).json({ message: "Server Error", error: error.message, success: false })
    }
}