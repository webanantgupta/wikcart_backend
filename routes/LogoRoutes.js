const express = require('express')
const {getLogoHeading,updateLogoHeading} = require("../controllers/LogoController");



const router = express.Router();


router.get("/getlogo",getLogoHeading);
router.put("/updatelogo",updateLogoHeading)



module.exports = router;