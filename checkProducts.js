// checkProducts.js
import mongoose from "mongoose";
import Product from "./models/Product.js"; // adjust path if needed

// Your MongoDB connection string
const MONGO_URI = "mongodb+srv://israeltim68_db_user:dsmpApDFH2dLi2iW@btstore.6d7rzbk.mongodb.net/vendordashboard?retryWrites=true&w=majority&appName=btstore";

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    const products = await Product.find();
    console.log("📦 Products in DB:");
    console.log(JSON.stringify(products, null, 2));

    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();
