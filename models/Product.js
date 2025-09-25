import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" }, // external/public URL of product image
    vendorEmail: { type: String, required: true, lowercase: true, trim: true },
    vendorName: { type: String, required: true, trim: true },
    vendorPhone: { type: String, default: "" },
    vendorLogo: { type: String, default: "" },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

const Product = mongoose.model("Product", productSchema);

export default Product;
