import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDb from "../config/db.js";
import dotenv from "dotenv";

import productRouter from "../routes/productRoute.js";
import userRouter from "../routes/userRoute.js";
import adminRouter from "../routes/adminRoute.js";
import categoryRouter from "../routes/categoryRoute.js";

dotenv.config();

const app = express();

// Connect DB
await connectDb();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.vercel.app"
];

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

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

app.get("/", (req, res) => {
  res.send("API Running Successfully");
});

export default app;