const AddProductModel = require("../models/AddProductModel");
const db = require("../config/db");


const toNumber = (val) => (val ? Number(val) : 0);
const toBoolean = (val) => {
    if (val === 'true' || val === true || val === 1 || val === '1') return true;
    return false;
};


exports.createProducts = async (req, res) => {
  try {
    const vendorId = req.vendorId;

    // FILES
    const thumbnail =
      req.files?.thumbnail_image?.[0]?.filename || null;

    const gallery =
      req.files?.gallery_images?.map(file => file.filename) || [];

    const pdf =
      req.files?.pdf_specification?.[0]?.filename || null;

    const metaImage =
      req.files?.meta_image?.[0]?.filename || null;

    // BODY
    const {
      name,
      category,
      brand,
      unit,
      product_condition,
      tags,
      product_type,
      purchase_price,
      unit_price,
      quantity,
      sku,
      discount,
      discount_type,
      summary,
      description,
      youtube_link,
      meta_title,
      meta_description,
      featured,
      refundable,
      authentic,
      cash_on_delivery,
      warranty,
      low_stock_quantity,
      purchase_quantity_minimum,
      purchase_quantity_maximum,
      attachment_on_purchase
    } = req.body;

    if (!name || !unit_price) {
      return res.status(400).json({
        success: false,
        message: "Name and Unit Price are required",
      });
    }

    let parsedTags = [];

    try {
      parsedTags = tags ? JSON.parse(tags) : [];
    } catch {
      parsedTags = [];
    }

    const productData = {
      vendor_id: vendorId,
      name,
      category,
      brand,
      unit,
      product_condition,
      tags: parsedTags,
      product_type: product_type || "single",

      purchase_price: Number(purchase_price) || 0,
      unit_price: Number(unit_price) || 0,
      quantity: Number(quantity) || 0,

      sku,

      discount: Number(discount) || 0,
      discount_type: discount_type || "flat",

      summary,
      description,

      thumbnail_image: thumbnail,
      gallery_images: gallery,
      pdf_specification: pdf,
      meta_image: metaImage,

      youtube_link,
      meta_title,
      meta_description,

      featured:
        featured === "true" || featured === true,

      refundable:
        refundable === "true" || refundable === true,

      authentic:
        authentic === "true" || authentic === true,

      cash_on_delivery:
        cash_on_delivery === "true" ||
        cash_on_delivery === true,

      warranty:
        warranty === "true" || warranty === true,

      low_stock_quantity:
        Number(low_stock_quantity) || 0,

      purchase_quantity_minimum:
        Number(purchase_quantity_minimum) || 1,

      purchase_quantity_maximum:
        Number(purchase_quantity_maximum) || 10,

      attachment_on_purchase:
        attachment_on_purchase === "true" ||
        attachment_on_purchase === true,
    };

    console.log(productData);

    const product = await AddProductModel.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Database Error",
      error: error.message,
    });
  }
};


// exports.getAllProducts = (req,res) =>{
//     try {
//         AddProductModel.getAll((err,result)=>{
//              if(err){
//                 return res.status(500).json({message:"Database Error", error:err.message,success:false})
//             }
//             return res.status(200).json({message:"Products fetched Successfully", data:result, success:true})
//         })
//     } catch (error) {
//          return res.status(500).json({message: "Server Error", error:error.message, success:false})
//     }
// }

exports.getAllProducts = async (req, res) => {
  try {
    // Logged-in vendor id from JWT
    const vendorId = req.vendorId;

    // Fetch products
    const products = await AddProductModel.getProductsByVendor(vendorId);

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });

  } catch (error) {

    console.error("Get Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database Error",
      error: error.message,
    });

  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await AddProductModel.getById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });

  } catch (error) {
    console.error("Get Product By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database Error",
      error: error.message,
    });
  }
};


// exports.deleteProductById = (req,res) =>{
//     try {
//         const {id} = req.params;
//         AddProductModel.deleteById(id,(err,result)=>{
//                 if(err){
//                 return res.status(500).json({message:"Database Error", error:err.message,success:false})
//             }
//             return res.status(200).json({message:"Product deleted by id Successfully", data:result, success:true})
//         })
//     } catch (error) {
//         return res.status(500).json({message: "Server Error", error:error.message, success:false})
//     }
// }

exports.getAllProductsPublic = async (req, res) => {
  try {

    const products = await AddProductModel.getAllProductsPublic();

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      data: products,
    });

  } catch (error) {

    console.error("Get Public Products Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });

  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.vendorId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await AddProductModel.deleteById(id, vendorId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });

  } catch (error) {
    console.error("Delete Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database Error",
      error: error.message,
    });
  }
};


// exports.updateProductById = (req,res) =>{
//     try {
//         const {id} = req.params;
//         AddProductModel.updateById(id, req.body,(err,result)=>{
//                  if(err){
//                 return res.status(500).json({message:"Database Error", error:err.message,success:false})
//             }
//             return res.status(200).json({message:"Product updated by id Successfully", data:result, success:true})
//         })
//     } catch (error) {
//          return res.status(500).json({message: "Server Error", error:error.message, success:false})
//     }
// }

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendorId = req.vendorId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const updatedProduct = await AddProductModel.updateById(
      id,
      vendorId,
      req.body
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });

  } catch (error) {
    console.error("Update Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Database Error",
      error: error.message,
    });
  }
};