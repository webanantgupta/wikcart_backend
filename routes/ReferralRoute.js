const express = require("express");
const {createReferral,getAllReferral} = require("../controllers/ReferralController");



const router = express.Router();

router.post("/create-referral",createReferral);
router.get("/getall-referral",getAllReferral)



module.exports = router;