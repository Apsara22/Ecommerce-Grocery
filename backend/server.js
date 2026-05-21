import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
dotenv.config();

const app = express(); // ✅ FIRST create app

const port = process.env.PORT || 3000;

// connect DB
await connectDb();

// allowed origins
const allowedOrigins = ["http://localhost:5173"];

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});