import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoute from "./routes/auth.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import couponRoute from "./routes/coupon.route.js";
import analyticsRoute from "./routes/analytics.route.js";
import paymentRoute from "./routes/payment.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname=path.resolve();
app.use(cors({
	origin: "http://localhost:5173",
	credentials: true,
}));


app.use(express.json({limit:"10mb"}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupons", couponRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/payments/",paymentRoute);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));
}

app.get("/:path*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT,()=>{
  console.log("Server is running on http://localhost:"+PORT);
  connectDB();
})