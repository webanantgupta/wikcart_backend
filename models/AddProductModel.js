const db = require("../config/db");

const addProductModel = {

  // ================= CREATE PRODUCT =================
  create: async (productData) => {

    const sql = `
      INSERT INTO products (
        vendor_id,
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
        thumbnail_image,
        gallery_images,
        pdf_specification,
        youtube_link,
        meta_title,
        meta_description,
        meta_image,
        featured,
        refundable,
        authentic,
        cash_on_delivery,
        warranty,
        low_stock_quantity,
        purchase_quantity_minimum,
        purchase_quantity_maximum,
        attachment_on_purchase
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,
        $9,$10,$11,$12,$13,$14,$15,$16,
        $17,$18,$19,$20,$21,$22,$23,$24,
        $25,$26,$27,$28,$29,$30,$31,$32
      )
      RETURNING *;
    `;

    const values = [
      productData.vendor_id,
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
      productData.discount || 0,
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
      productData.low_stock_quantity || 0,
      productData.purchase_quantity_minimum || 1,
      productData.purchase_quantity_maximum || 999,
      productData.attachment_on_purchase || false
    ];

    const result = await db.query(sql, values);

    return result.rows[0];
  },

  // ================= GET PRODUCTS OF LOGGED IN VENDOR =================

  getProductsByVendor: async (vendorId) => {

    const sql = `
      SELECT *
      FROM products
      WHERE vendor_id = $1
      ORDER BY created_at DESC
    `;

    const result = await db.query(sql, [vendorId]);

    return result.rows;
  },

  // ================= GET ALL PRODUCTS =================

  getAllProductsPublic: async () => {

    const sql = `
      SELECT *
      FROM products
      ORDER BY created_at DESC
    `;

    const result = await db.query(sql);

    return result.rows;
  },

  // ================= GET PRODUCT BY ID =================

  getById: async (id) => {

    const sql = `
      SELECT *
      FROM products
      WHERE id = $1
    `;

    const result = await db.query(sql, [id]);

    return result.rows[0];
  },

  // ================= DELETE PRODUCT =================

  deleteById: async (id, vendorId) => {

    const sql = `
      DELETE FROM products
      WHERE id = $1
      AND vendor_id = $2
      RETURNING *;
    `;

    const result = await db.query(sql, [id, vendorId]);

    return result.rows[0];
  },

  // ================= UPDATE PRODUCT =================

  updateById: async (id, vendorId, productData) => {

    let fields = [];
    let values = [];
    let index = 1;

    for (const key in productData) {

      fields.push(`${key} = $${index}`);

      if (key === "tags") {
        values.push(JSON.stringify(productData[key]));
      } else {
        values.push(productData[key]);
      }

      index++;
    }

    values.push(id);
    values.push(vendorId);

    const sql = `
      UPDATE products
      SET ${fields.join(", ")}
      WHERE id = $${index}
      AND vendor_id = $${index + 1}
      RETURNING *;
    `;

    const result = await db.query(sql, values);

    return result.rows[0];
  }

};

module.exports = addProductModel;