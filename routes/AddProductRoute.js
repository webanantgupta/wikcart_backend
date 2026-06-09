const express = require("express");
const router = express.Router();

const {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById
} = require("../controllers/AddProductController");

const upload = require("../middlewares/upload");

// CREATE
router.post(
  "/create-product",
  upload.fields([
    { name: "thumbnail_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 5 },
    { name: "pdf_specification", maxCount: 1 },
    { name: "meta_image", maxCount: 1 }
  ]),
  createProducts
);

// GET
router.get("/get-products", getAllProducts);
router.get("/getbyid/:id", getProductById);

// DELETE
router.delete("/deletebyid/:id", deleteProductById);

// UPDATE
router.put(
  "/updatebyid/:id",
  upload.fields([
    { name: "thumbnail_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 5 },
    { name: "pdf_specification", maxCount: 1 },
    { name: "meta_image", maxCount: 1 }
  ]),
  updateProductById
);

module.exports = router;