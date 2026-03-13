import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
console.log("DNS servers set to:", dns.getServers());

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import seedRouter from "./routes/seedRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://localhost:5175",
    "http://localhost:5176",
    "https://bukhari-s-store-4w4g.vercel.app",
    "https://bukhari-s-store-huz5.vercel.app", // ADD THIS - your current active domain
    "https://bukhari-s-store.vercel.app" // ADD THIS - your main domain
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", seedRouter);

app.get("/", (req, res) => res.send("Bukhari Store API Running ✅"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));