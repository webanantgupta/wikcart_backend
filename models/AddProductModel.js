const db = require("../config/db");


const addCustomerModel = {

    create: (productData,callback)=>{
         const sql = `
        INSERT INTO products (
          name, category, brand, unit, product_condition, tags,
          product_type, purchase_price, unit_price, quantity, sku,
          discount, discount_type, summary, description,
          thumbnail_image, gallery_images, pdf_specification,
          youtube_link, meta_title, meta_description, meta_image,
          featured, refundable, authentic, cash_on_delivery,
          warranty, low_stock_quantity, purchase_quantity_minimum,
          purchase_quantity_maximum, attachment_on_purchase
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        productData.name,
        productData.category,
        productData.brand,
        productData.unit,
        productData.product_condition,
JSON.stringify(productData.tags || []),
     productData.product_type || "single",  
        productData.purchase_price,
        productData.unit_price,
        productData.quantity,
        productData.sku,
        productData.discount,
         productData.discount_type || "flat", 
        productData.summary,
        productData.description,
        productData.thumbnail_image,
        productData.gallery_images,
        productData.pdf_specification,
        productData.youtube_link,
        productData.meta_title,
        productData.meta_description,
        productData.meta_image,
        productData.featured || false,
        productData.refundable || false,
        productData.authentic || false,
        productData.cash_on_delivery || false,
        productData.warranty || false,
        productData.low_stock_quantity,
        productData.purchase_quantity_minimum,
        productData.purchase_quantity_maximum,
        productData.attachment_on_purchase || false,
      ];
      db.query(sql,values,callback);
    },

// create: (productData, callback) => {
//     const sql = `
//         INSERT INTO products (
//           name, category, brand, unit, product_condition, tags,
//           product_type, purchase_price, unit_price, quantity, sku,
//           discount, discount_type, summary, description,
//           thumbnail_image, gallery_images, pdf_specification,
//           youtube_link, meta_title, meta_description, meta_image,
//           featured, refundable, authentic, cash_on_delivery,
//           warranty, low_stock_quantity, purchase_quantity_minimum,
//           purchase_quantity_maximum, attachment_on_purchase
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//     const values = [
//       productData.name,
//       productData.category,
//       productData.brand,
//       productData.unit,
//       productData.product_condition,
//       JSON.stringify(productData.tags || []), // Ensure tags are stringified for DB
//       productData.product_type || "single",
//       productData.purchase_price || 0,
//       productData.unit_price || 0,
//       productData.quantity || 0,
//       productData.sku,
//       productData.discount || 0,
//       productData.discount_type || "flat",
//       productData.summary,
//       productData.description,
//       productData.thumbnail_image,
//       productData.gallery_images, // This is already stringified in the controller
//       productData.pdf_specification,
//       productData.youtube_link,
//       productData.meta_title,
//       productData.meta_description,
//       productData.meta_image,
//       productData.featured ? 1 : 0,    // Convert booleans to 1/0 for MySQL
//       productData.refundable ? 1 : 0,
//       productData.authentic ? 1 : 0,
//       productData.cash_on_delivery ? 1 : 0,
//       productData.warranty,
//       productData.low_stock_quantity || 0,
//       productData.purchase_quantity_minimum || 0,
//       productData.purchase_quantity_maximum || 0,
//       productData.attachment_on_purchase ? 1 : 0
//     ];

//     db.query(sql, values, callback);
//   },
    getAll: (callback)=>{
        const sql = `SELECT * from products`;
        db.query(sql,callback)
    },

    getById: (id, callback)=>{
  const sql= `SELECT * from products WHERE id = ?`;
  db.query(sql,[id],callback)
    },

    deleteById: (id,callback)=>{
        const sql = `DELETE FROM products WHERE id = ?`;
        db.query(sql,[id],callback)
    },


updateById: (id, productData, callback) => {
  let fields = [];
  let values = [];

  for (let key in productData) {
    if (key === "tags") {
      fields.push(`${key} = ?`);
      values.push(JSON.stringify(productData[key]));
    } else {
      fields.push(`${key} = ?`);
      values.push(productData[key]);
    }
  }

  const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, callback);
}
}



module.exports = addCustomerModel;