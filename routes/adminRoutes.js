const express = require("express");
const router = express.Router();

const adminAuth = require("../middlewares/adminAuth");

const adminController = require("../controllers/adminController");

router.get(
  "/dashboard",
  adminAuth,
  adminController.dashboard
);

router.get(
  "/vendors",
  adminAuth,
  adminController.getAllVendors
);

router.get(
  "/customers",
  adminAuth,
  adminController.getAllCustomers
);

router.get(
  "/products",
  adminAuth,
  adminController.getAllProducts
);

router.get(
  "/orders",
  adminAuth,
  adminController.getAllOrders
);

module.exports = router;