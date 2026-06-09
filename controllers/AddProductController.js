const AddProductModel = require("../models/AddProductModel");
const db = require("../config/db");


// exports.createProducts = (req,res) =>{
//     try {
//         const { name, category, brand, unit, product_condition, tags,
//           product_type, purchase_price, unit_price, quantity, sku,
//           discount, discount_type, summary, description,
//           thumbnail_image, gallery_images, pdf_specification,
//           youtube_link, meta_title, meta_description, meta_image,
//           featured, refundable, authentic, cash_on_delivery,
//           warranty, low_stock_quantity, purchase_quantity_minimum,
//           purchase_quantity_maximum, attachment_on_purchase} = req.body;

//           if(!name || !unit_price){
//             return res.status(400).json({message:"Name and price is required",success:false})
//           }

//           const productData = {name, category, brand, unit, product_condition, tags,
//           product_type, purchase_price, unit_price, quantity, sku,
//           discount, discount_type, summary, description,
//           thumbnail_image, gallery_images, pdf_specification,
//           youtube_link, meta_title, meta_description, meta_image,
//           featured, refundable, authentic, cash_on_delivery,
//           warranty, low_stock_quantity, purchase_quantity_minimum,
//           purchase_quantity_maximum, attachment_on_purchase};

//           AddProductModel.create(productData, (err,result)=>{
//             if(err){
//                 return res.status(500).json({message:"Database Error", error:err.message,success:false})
//             }
//             return res.status(201).json({message:"Product Created Successfully", data:result, success:true})
//           })
//     } catch (error) {
//         return res.status(500).json({message: "Server Error", error:error.message, success:false})
//     }
// } 


// ✅ helper functions (add at top of file)
// const toBoolean = (val) => val === "true" || val === true ? 1 : 0;
// const toNumber = (val) => (val !== undefined && val !== "" ? Number(val) : null);
// Add these at the top of your controller file
const toNumber = (val) => (val ? Number(val) : 0);
const toBoolean = (val) => {
    if (val === 'true' || val === true || val === 1 || val === '1') return true;
    return false;
};

exports.createProducts = (req, res) => {
  try {

    // 📂 FILES (from multer)
    const thumbnail = req.files?.thumbnail_image?.[0]?.filename || null;
    const gallery = req.files?.gallery_images?.map(file => file.filename) || [];
    const pdf = req.files?.pdf_specification?.[0]?.filename || null;
    const metaImage = req.files?.meta_image?.[0]?.filename || null;

    // 📝 BODY
    const {
      name, category, brand, unit, product_condition, tags,
      product_type, purchase_price, unit_price, quantity, sku,
      discount, discount_type, summary, description,
      youtube_link, meta_title, meta_description,
      featured, refundable, authentic, cash_on_delivery,
      warranty, low_stock_quantity, purchase_quantity_minimum,
      purchase_quantity_maximum, attachment_on_purchase
    } = req.body;

    // ✅ validation
    if (!name || !unit_price) {
      return res.status(400).json({
        message: "Name and price is required",
        success: false
      });
    }

    // ✅ safe tags parsing
    let parsedTags = [];
    try {
      parsedTags = tags ? JSON.parse(tags) : [];
    } catch (err) {
      return res.status(400).json({
        message: "Invalid tags format",
        success: false
      });
    }

    // ✅ final data object
    const productData = {
      name,
      category,
      brand,
      unit,
      product_condition,
      tags: parsedTags,
      product_type: product_type || "single",

      purchase_price: toNumber(purchase_price),
      unit_price: toNumber(unit_price),
      quantity: toNumber(quantity),
      sku,
      discount: toNumber(discount),
      discount_type: discount_type || "flat",

      summary,
      description,

      // 📂 FILES
      thumbnail_image: thumbnail,
      gallery_images: JSON.stringify(gallery),
      pdf_specification: pdf,
      meta_image: metaImage,

      youtube_link,
      meta_title,
      meta_description,

      // 🔥 BOOLEAN FIX
      featured: toBoolean(featured),
      refundable: toBoolean(refundable),
      authentic: toBoolean(authentic),
      cash_on_delivery: toBoolean(cash_on_delivery),
      attachment_on_purchase: toBoolean(attachment_on_purchase),

      warranty,
      low_stock_quantity: toNumber(low_stock_quantity),
      purchase_quantity_minimum: toNumber(purchase_quantity_minimum),
      purchase_quantity_maximum: toNumber(purchase_quantity_maximum)
    };

    // ✅ DB call
    AddProductModel.create(productData, (err, result) => {
      if (err) {
        console.log("Error" , err);
        
        return res.status(500).json({
          message: "Database Error",
          error: err.sqlMessage,
          detaile: err.code,
          success: false
        });
      }

      return res.status(201).json({
        message: "Product Created Successfully",
        data: result,
        success: true
      });
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
      success: false
    });
  }
};

exports.getAllProducts = (req,res) =>{
    try {
        AddProductModel.getAll((err,result)=>{
             if(err){
                return res.status(500).json({message:"Database Error", error:err.message,success:false})
            }
            return res.status(200).json({message:"Products fetched Successfully", data:result, success:true})
        })
    } catch (error) {
         return res.status(500).json({message: "Server Error", error:error.message, success:false})
    }
}

exports.getProductById = (req,res) =>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({message:"ID is required", success:false})
        }

        AddProductModel.getById(id,(err,result)=>{
               if(err){
                return res.status(500).json({message:"Database Error", error:err.message,success:false})
            }
            return res.status(200).json({message:"Product fetched by id Successfully", data:result, success:true})
        })
    } catch (error) {
        return res.status(500).json({message: "Server Error", error:error.message, success:false})
    }
}


exports.deleteProductById = (req,res) =>{
    try {
        const {id} = req.params;
        AddProductModel.deleteById(id,(err,result)=>{
                if(err){
                return res.status(500).json({message:"Database Error", error:err.message,success:false})
            }
            return res.status(200).json({message:"Product deleted by id Successfully", data:result, success:true})
        })
    } catch (error) {
        return res.status(500).json({message: "Server Error", error:error.message, success:false})
    }
}


exports.updateProductById = (req,res) =>{
    try {
        const {id} = req.params;
        AddProductModel.updateById(id, req.body,(err,result)=>{
                 if(err){
                return res.status(500).json({message:"Database Error", error:err.message,success:false})
            }
            return res.status(200).json({message:"Product updated by id Successfully", data:result, success:true})
        })
    } catch (error) {
         return res.status(500).json({message: "Server Error", error:error.message, success:false})
    }
}