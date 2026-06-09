const ReferralModel = require("../models/ReferralModel");
const db = require("../config/db");



exports.createReferral = (req,res) =>{
    try {
        const {referrer_name, referred_name} = req.body;

if(!referrer_name || !referred_name){
    return res.status(400).json({message:"Both the fields are required",success:true})
}

ReferralModel.create({referrer_name,referred_name},(err,result)=>{
    if(err){
        return res.status(500).json({message:"Server Error",success:false,error:err.message})
    }

    return res.status(201).json({message:"REferral created successfully",success:true,result})
})

    } catch (error) {
        return res.status(500).json({message:"Server Error",success:false,error:error.message})
    }
}

exports.getAllReferral = (req,res) =>{
    try {
        ReferralModel.getAll((err,result)=>{
            if(err){
                 return res.status(500).json({message:"Server Error",success:false,error:err.message})
            }

             return res.status(200).json({message:"All Referral fetched successfully",success:true,result})
        })
    } catch (error) {
         return res.status(500).json({message:"Server Error",success:false,error:error.message})
    }
}