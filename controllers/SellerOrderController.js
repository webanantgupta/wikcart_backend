const sellerOrderModel = require("../models/SellerOrderModel");

// ✅ CREATE
exports.createSellerOrder = (req, res) => {
  try {
    const {
      order_code,
      customer_name,
      is_guest,
      num_products,
      amount,
      order_status,
      payment_status
    } = req.body;

    if (!order_code || !customer_name || !amount) {
      return res.status(400).json({
        message: "Required fields: order_code, customer_name, amount",
        success: false
      });
    }

    const data = {
      order_code,
      customer_name,
      is_guest,
      num_products,
      amount,
      order_status,
      payment_status
    };

    sellerOrderModel.create(data, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Server Error",
          success: false,
          error: err.message
        });
      }

      return res.status(201).json({
        message: "Seller order created successfully",
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


exports.getAllSellerOrders = (req, res) => {
  sellerOrderModel.getAll((err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  });
};


exports.getSellerOrderById = (req, res) => {
  const { id } = req.params;

  sellerOrderModel.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};


exports.deleteSellerOrder = (req, res) => {
  const { id } = req.params;

  sellerOrderModel.deleteById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  });
};



// ## 🔹 UPDATE STATUS
exports.updateSellerOrderStatus = (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;

  if (!order_status) {
    return res.status(400).json({
      success: false,
      message: "order_status is required"
    });
  }

  sellerOrderModel.updateStatus(id, order_status, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated"
    });
  });
};