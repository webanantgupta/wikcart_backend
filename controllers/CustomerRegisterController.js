

const CustomerRegisterModel = require("../models/CustomerRegisterModel");
const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.registerCustomer = async (req, res) => {
  try {
    const {
      full_name,
      mobile_number,
      city,
      state,
      pincode,
      email,
      full_address,
      password,
    } = req.body;

    // VALIDATION
    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full Name, Email, and Password are required fields.",
      });
    }

    // CHECK EMAIL EXISTS
    const checkEmailSql = `SELECT * FROM customers_register WHERE email = ?`;

    db.query(checkEmailSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
          error: err.message,
        });
      }

      // EMAIL ALREADY EXISTS
      if (result.length > 0) {
        return res.status(409).json({
          success: false,
          message: "Email already registered",
        });
      }

      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // CREATE CUSTOMER
      const customerData = {
        full_name,
        mobile_number,
        city,
        state,
        pincode,
        email,
        full_address,
        password_hash,
      };

      CustomerRegisterModel.create(customerData, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Customer Registration Failed",
            error: err.message,
          });
        }

        return res.status(201).json({
          success: true,
          message: "Customer Registered Successfully",
          data: result,
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



exports.getAllRegisterCustomer = (req,res) =>{
    try {
        
        CustomerRegisterModel.getAll((err,result)=>{
              if (err) {
          return res.status(500).json({
            success: false,
            message: "Customer Registration Failed",
            error: err.message,
          });
        }
 return res.status(200).json({
          success: true,
          message: "All Customer fetched Successfully",
          data: result
        });

        })
    } catch (error) {
         return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
    }
}

exports.loginCustomer = async (req, res) => {

    try {

        const { email, password } = req.body;

        // VALIDATION
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        // CHECK EMAIL
        CustomerRegisterModel.loginCustomer(email, async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Database Error",
                    error: err.message
                });
            }

            // EMAIL NOT FOUND
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Customer not found"
                });
            }

            const customer = result[0];

            // COMPARE PASSWORD
            const isMatch = await bcrypt.compare(
                password,
                customer.password_hash
            );

            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });
            }

            // SUCCESS LOGIN
            return res.status(200).json({
                success: true,
                message: "Login Successful",
                customer: {
                    id: customer.id,
                    full_name: customer.full_name,
                    email: customer.email
                }
            });

        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });

    }

};