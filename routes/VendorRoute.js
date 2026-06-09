const express = require("express")
const VendorController = require("../controllers/VendorController");


const router = express.Router();


router.post("/create-vendor",VendorController.createVendor);
router.get("/getall-vendor", VendorController.getAllVendor);
router.get("/getbyid-vendor/:id", VendorController.getVendorById);
router.get("/getbyemail-vendor/:email", VendorController.getVendorByEmail);
router.delete("/deletebyid-vendor/:id",VendorController.deleteVendorById);

module.exports = router