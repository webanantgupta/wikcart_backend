const VendorModel = require("../models/VendorModel");
const db = require("../config/db");
const bcryptjs = require("bcryptjs")

const VendorController = {

    createVendor: async (req, res) => {
        try {
            const { name, email, password, google_id } = req.body;

const hasdedPassword = await bcryptjs.hash(password,10);

            const data = {
                name,
                email,
                password:hasdedPassword,
                google_id: google_id || null
            }

            VendorModel.create(data, (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Server Error", success: false, error: err.message })
                }

                return res.status(201).json({ message: "Vendor registered successfully", success: true, result })
            })

        } catch (error) {
            return res.status(500).json({ message: "Server Error", success: false, error: error.message })
        }
    },


    getAllVendor: (req, res) => {
        try {
            VendorModel.getAll((err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Server Error", success: false, error: err.message })
                }

                return res.status(200).json({ message: "Vendor Fetched successfully", success: true, result })
            })
        } catch (error) {
            return res.status(500).json({ message: "Server Error", success: false, error: error.message })
        }
    },

    getVendorById:(req,res)=>{
try {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message:"id is required",success:false})
    }
    VendorModel.getById(id,(err,result)=>{
           if (err) {
                    return res.status(500).json({ message: "Server Error", success: false, error: err.message })
                }

                if(result.length === 0 ){
                    return res.status(404).json({message:"Data not found",success:false})
                }
                 return res.status(200).json({ message: "Vendor Fetched successfully", success: true, result })

    })
} catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message })
}
    },

    getVendorByEmail:(req,res)=>{
try {
    const {email} = req.params;
      if(!email){
        return res.status(400).json({message:"id is required",success:false})
    }

    VendorModel.getByEmail(email,(err,result)=>{
         if (err) {
                    return res.status(500).json({ message: "Server Error", success: false, error: err.message })
                }

   if(result.length === 0 ){
                    return res.status(404).json({message:"Data not found",success:false})
                }

                return res.status(200).json({ message: "Vendor Fetched by email successfully", success: true, result })   
    })
} catch (error) {
      return res.status(500).json({ message: "Server Error", success: false, error: error.message })
}
    },

    deleteVendorById:(req,res) =>{
        try {
            const {id} = req.params;

              if(!id){
        return res.status(400).json({message:"id is required",success:false})
    }

    VendorModel.deleteById(id,(err,result)=>{
          if (err) {
                    return res.status(500).json({ message: "Server Error", success: false, error: err.message })
                }
if(result.affectedRows === 0){
    return res.status(404).json({message:"Data not found",success:false})
}

 return res.status(200).json({ message: "Vendor deleted by id successfully", success: true, result }) 

    })
        } catch (error) {
              return res.status(500).json({ message: "Server Error", success: false, error: error.message })
        }
    }

}




module.exports = VendorController