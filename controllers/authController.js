// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "../models/Vendor.js";

// ======================
// Register Vendor
// ======================
export const registerVendor = async (req, res) => {
  try {
    const { name, email, password, logo, phone } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      logo,
      phone,
    });
    await vendor.save();

    res.json({ success: true, message: "Vendor registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================
// Login Vendor
// ======================
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res
        .status(400)
        .json({ success: false, message: "Vendor not found" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      vendor: {
        id: vendor._id,
        email: vendor.email,
        name: vendor.name,
        logo: vendor.logo,
        phone: vendor.phone,
      },
      token,
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================
// Get Vendor Profile
// ======================
export const getProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendorId).select("-password");
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }

    res.json({ success: true, vendor });
  } catch (err) {
    console.error("❌ Profile Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
