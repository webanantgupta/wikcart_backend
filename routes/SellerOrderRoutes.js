const express = require("express");
const {
  createSellerOrder,
  getAllSellerOrders,
  getSellerOrderById,
  deleteSellerOrder,
  updateSellerOrderStatus
} = require("../controllers/SellerOrderController");

const router = express.Router();

router.post("/create-seller-order", createSellerOrder);
router.get("/getall-seller-orders", getAllSellerOrders);
router.get("/getbyid-seller-order/:id", getSellerOrderById);
router.delete("/deletebyid-seller-order/:id", deleteSellerOrder);
router.put("/updatebyid-seller-order/:id/status", updateSellerOrderStatus);

module.exports = router;