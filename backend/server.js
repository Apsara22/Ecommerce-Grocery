import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDb from "./config/db.js";

import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

dotenv.config();

const app = express();

// Connect Database
await connectDb();

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const allowedOrigins = [
  "https://ecommerce-grocery-7k1t.vercel.app/",
  
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Export app for Vercel
export default app;