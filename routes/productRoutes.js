import express from "express";
import { addProduct, getProducts, editProduct, deleteProduct } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addProduct);
router.get("/", getProducts);
router.put("/:id", authMiddleware, editProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
