const express = require("express");
const {registerCustomer,getAllRegisterCustomer,loginCustomer} = require("../controllers/CustomerRegisterController");



const router = express.Router();

router.post("/customer-register",registerCustomer);
router.get("/customer-getAll",getAllRegisterCustomer);
router.post("/customer-login", loginCustomer);



module.exports = router;