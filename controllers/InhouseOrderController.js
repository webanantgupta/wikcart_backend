const inHouseOrderModel = require("../models/InhouseOrderModel");
const db = require("../config/db");


exports.createInhouseOrder = (req,res) =>{
    try {
        const {order_code,customer_name,num_products,amount,status,is_new} = req.body;

         if (!order_code || !customer_name || !amount) {
      return res.status(400).json({
        message: "Required fields: order_code, customer_name, amount",
        success: false
      });
    }

        data={
            order_code, 
customer_name,
num_products: num_products || 1,
amount,
status: status || "pending",
is_new: is_new ?? 1


        }
        inHouseOrderModel.create(data, (err,result)=>{
            if(err){
            return res.status(500).json({message:"Server Error", success:false, error:err.message})
            }

            return res.status(201).json({message:"InHouse Order created successfully", success:true, data:result})
        })
    } catch (error) {
        
    }
}

exports.getAllInhouseOrders = (req, res) => {
  try {
    inHouseOrderModel.getAll((err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Server Error",
          success: false,
          error: err.message
        });
      }

      if(!result || result.length === 0){
        return res.status(404).json({message:"No order found in the system", success:false, data:[]})
      }

      return res.status(200).json({
        message: "Orders fetched successfully",
        success: true,
        data: result
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected Error",
      success: false,
      error: error.message
    });
  }
};


exports.getInhouseOrderById = (req, res) => {
  try {
    const { id } = req.params;

    inHouseOrderModel.getById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Server Error",
          success: false,
          error: err.message
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Order not found",
          success: false
        });
      }

      return res.status(200).json({
        message: "Order fetched successfully",
        success: true,
        data: result[0]
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected Error",
      success: false,
      error: error.message
    });
  }
};


exports.deleteInhouseOrder = (req, res) => {
  try {
    const { id } = req.params;

    inHouseOrderModel.deleteById(id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Server Error",
          success: false,
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Order not found",
          success: false
        });
      }

      return res.status(200).json({
        message: "Order deleted successfully",
        success: true
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected Error",
      success: false,
      error: error.message
    });
  }
};