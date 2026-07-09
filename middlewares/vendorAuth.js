const jwt = require("jsonwebtoken");
const db = require("../config/db");

const vendorAuth = async (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const userId = decoded.id;

    console.log("Decoded User ID :", userId);

    const vendor = await db.query(
      `
      SELECT *
      FROM vendor_register
      WHERE user_id = $1
      `,
      [userId]
    );

    console.log("Vendor Query :", vendor.rows);

    if (vendor.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Vendor not found"
      });
    }

    req.user = decoded;
    req.vendorId = vendor.rows[0].id;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }

};

module.exports = vendorAuth;