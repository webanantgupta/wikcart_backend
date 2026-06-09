// const Commission = require("../models/ComissionModel");

// exports.getCommission = async (req, res) => {
//   try {
//     const settings = await Commission.getSettings();
//     res.status(200).json({ success: true, data:settings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.updateCommission = async (req, res) => {
//   try {
//     const { commission_type, commission_value } = req.body;
//     if (!commission_type || commission_value === undefined) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }
//     await Commission.updateSettings(commission_type, commission_value);
//     res.status(200).json({ success: true, message: "Commission updated successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


const Commission = require("../models/ComissionModel");


// GET Commission
exports.getCommission = async (req, res) => {

  try {

    const settings = await Commission.getSettings();

    res.status(200).json({
      success: true,
      data: settings
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// UPDATE Commission
exports.updateCommission = async (req, res) => {

  try {

    const { commision_type, comission_value } = req.body;

    if (!commision_type || comission_value === undefined) {

      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });

    }

    await Commission.updateSettings(
      commision_type,
      comission_value
    );

    res.status(200).json({
      success: true,
      message: "Commission updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};