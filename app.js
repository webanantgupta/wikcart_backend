const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRouter = require("./routes/authRoutes");
const addProductRouter = require("./routes/AddProductRoute");
const customerRouter = require("./routes/customerRouter");
const logoRouter = require("./routes/LogoRoutes");
const InhouseOrder = require("./routes/InHouseRoute");
const SellerOrderRouter = require("./routes/SellerOrderRoutes");
const ComissionRouter = require("./routes/comissionRoute");
const ReferralRoute = require("./routes/ReferralRoute")
const CustomerRoute = require("./routes/CustomerRegisterRoute");
const VendorRoute = require("./routes/VendorRoute");
const adminRoute = require("./routes/adminRoutes");

const app = express();


const allowedOrigins = [
"https://wikcart-frontend.vercel.app/",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use("/api/v1/admin",adminRoute);
app.use("/api/v1",authRouter);
app.use("/api/v2",addProductRouter);
app.use("/api/v3",customerRouter);
app.use("/api/v4", logoRouter);
app.use("/uploads", require("express").static("uploads"));
app.use("/api/v5", InhouseOrder);
app.use("/api/v6",SellerOrderRouter);
app.use("/api/v7",ComissionRouter);
app.use("/api/v8", ReferralRoute);
app.use("/api/v9",CustomerRoute);
app.use("/api/v10",VendorRoute);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

module.exports = app;