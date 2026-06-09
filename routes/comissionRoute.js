// const express = require("express");
// const router = express.Router();
// const { getCommission, updateCommission } = require("../controllers/comissionController");

// // GET /api/v6/commission - To load the current 5% into your UI
// router.get("/get-comission", getCommission);

// // POST /api/v6/commission - Triggered by the "Save Changes" button
// router.post("/update-comission", updateCommission);

// module.exports = router;


const express = require("express");

const router = express.Router();

const {
  getCommission,
  updateCommission
} = require("../controllers/comissionController");


// GET
router.get("/get-comission", getCommission);


// POST
router.post("/update-comission", updateCommission);


module.exports = router;