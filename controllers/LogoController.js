const Logo = require("../models/LogoModel");



exports.getLogoHeading = (req,res) =>{
    try {
        Logo.getLogo((err,result)=>{
            if(err){
                return res.status(500).json({message:"Server Error", error:err.message, success:false})
            }
            return res.status(200).json({message:"Logo heading fetched successfully", data:result, success:true})
        })
    } catch (error) {
        return res.status(500).json({message: "Server Error", error:error.message, success:false})
    }
}


exports.updateLogoHeading = (req,res) =>{
    try {
        const {logo_name} = req.body;
        if(!logo_name){
            return res.status(400).json({message:"Logo heading is required", success:false })
        }
        Logo.updateLogo(logo_name, (err,result)=>{
             if(err){
                return res.status(500).json({message:"Server Error", error:err.message, success:false})
            }
            return res.status(200).json({message:"Logo heading updated successfully", data:result, success:true})
        })
    } catch (error) {
         return res.status(500).json({message: "Server Error", error:error.message, success:false})
    }
}