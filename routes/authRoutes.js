// routes/authRoutes.js
import express from "express";
import {
  registerVendor,
  loginVendor,
  getProfile,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerVendor);
router.post("/login", loginVendor);

// Protected route
router.get("/profile", authMiddleware, getProfile);

export default router;
