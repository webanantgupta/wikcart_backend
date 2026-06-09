const express = require("express");
const {createCustomer,getAllCustomer, getCustomerById} = require("../controllers/CustomerController");


const router = express.Router();


router.post("/create-customer",createCustomer);
router.get("/getall",getAllCustomer);
router.get("/getbyid/:id", getCustomerById);



module.exports = router;