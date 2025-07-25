import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";


dotenv.config();

connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

  connectCloudinary();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ✅ API Routes
app.get("/", (req, res) => {
  res.send("✅ API is Working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});