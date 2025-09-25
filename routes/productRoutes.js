import express from "express";
import {
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all products (public)
router.get("/", getProducts);

// Add product (vendor only)
router.post("/", authMiddleware, addProduct);

// Edit product (vendor only)
router.put("/:id", authMiddleware, editProduct);

// Delete product (vendor only)
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
