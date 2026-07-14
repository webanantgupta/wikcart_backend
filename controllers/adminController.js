const db = require("../config/db");

exports.dashboard = async (req, res) => {
  try {

    const vendors = await db.query(
      "SELECT COUNT(*) FROM vendor_register"
    );

    const customers = await db.query(
      "SELECT COUNT(*) FROM customers_register"
    );

    const products = await db.query(
      "SELECT COUNT(*) FROM products"
    );

    res.status(200).json({
      success: true,
      data: {
        vendors: vendors.rows[0].count,
        customers: customers.rows[0].count,
        products: products.rows[0].count,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllVendors = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT
      users.id,
      users.full_name,
      users.email,
      users.status,
      vendor_register.created_at
      FROM users
      JOIN vendor_register
      ON users.id = vendor_register.user_id
      ORDER BY vendor_register.created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllCustomers = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT
      users.id,
      users.full_name,
      users.email,
      users.status,
      customers_register.created_at
      FROM users
      JOIN customers_register
      ON users.id = customers_register.user_id
      ORDER BY customers_register.created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

exports.getAllProducts = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT
        products.id,
        products.name,
        products.thumbnail_image,
        products.unit_price,
        products.quantity,
        products.created_at,

        vendor_register.shop_name,

        users.full_name AS vendor_name,
        users.email AS vendor_email

      FROM products

      JOIN vendor_register
        ON products.vendor_id = vendor_register.id

      JOIN users
        ON vendor_register.user_id = users.id

      ORDER BY products.created_at DESC
    `);

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.dashboard = async (req, res) => {
  try {
    const vendors = await db.query(
      "SELECT COUNT(*) FROM vendor_register"
    );

    const customers = await db.query(
      "SELECT COUNT(*) FROM customers_register"
    );

    const products = await db.query(
      "SELECT COUNT(*) FROM products"
    );

    const orders = await db.query(
      "SELECT COUNT(*) FROM seller_orders"
    );

    res.status(200).json({
      success: true,
      data: {
        vendors: Number(vendors.rows[0].count),
        customers: Number(customers.rows[0].count),
        products: Number(products.rows[0].count),
        orders: Number(orders.rows[0].count),
        totalUsers:
          Number(vendors.rows[0].count) +
          Number(customers.rows[0].count),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {

    const result = await db.query(`
      SELECT *
      FROM seller_orders
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};