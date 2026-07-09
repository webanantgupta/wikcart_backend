const express = require("express");
const router = express.Router();

const {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  getAllProductsPublic
} = require("../controllers/AddProductController");

const upload = require("../middlewares/upload");
const vendorAuth = require("../middlewares/vendorAuth");

// ================= CREATE PRODUCT =================
router.post(
  "/create-product",
  vendorAuth,
  upload.fields([
    { name: "thumbnail_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 5 },
    { name: "pdf_specification", maxCount: 1 },
    { name: "meta_image", maxCount: 1 }
  ]),
  createProducts
);

// ================= GET VENDOR PRODUCTS =================

router.get(
  "/get-products",
  vendorAuth,
  getAllProducts
);

// ================= GET SINGLE PRODUCT =================

router.get(
  "/getbyid/:id",
  vendorAuth,
  getProductById
);

router.get("/all-products",getAllProductsPublic);

// ================= DELETE PRODUCT =================

router.delete(
  "/deletebyid/:id",
  vendorAuth,
  deleteProductById
);

// ================= UPDATE PRODUCT =================

router.put(
  "/updatebyid/:id",
  vendorAuth,
  upload.fields([
    { name: "thumbnail_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 5 },
    { name: "pdf_specification", maxCount: 1 },
    { name: "meta_image", maxCount: 1 }
  ]),
  updateProductById
);

module.exports = router;