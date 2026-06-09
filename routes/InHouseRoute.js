const express = require("express");
const {createInhouseOrder,getAllInhouseOrders,getInhouseOrderById,deleteInhouseOrder} = require("../controllers/InhouseOrderController");



const router = express.Router();



router.post("/create-inhouseorder",createInhouseOrder);
router.get("/getall-orders", getAllInhouseOrders);
router.get("/get-ordersbyid/:id", getInhouseOrderById);
router.delete("/delete-ordersbyid/:id", deleteInhouseOrder);







module.exports = router;