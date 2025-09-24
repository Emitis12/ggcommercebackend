import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  paymentRef: { type: String },
});

export default mongoose.model("Order", orderSchema);
