import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  vendorEmail: { type: String, required: true },
  vendorName: { type: String, required: true },
  vendorPhone: { type: String },
  vendorLogo: { type: String },
});

export default mongoose.model("Product", productSchema);
