import Product from "../models/Product.js";

// @desc    Add a new product
// @route   POST /api/products
// @access  Private (vendor)
export const addProduct = async (req, res) => {
  try {
    const { title, price, image, vendorEmail, vendorName, vendorPhone, vendorLogo } = req.body;

    if (!title || !price || !vendorEmail || !vendorName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const product = new Product({
      title,
      price,
      image: image || "", // store external/public URL
      vendorEmail,
      vendorName,
      vendorPhone: vendorPhone || "",
      vendorLogo: vendorLogo || "",
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Error adding product:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get all products or by vendor
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { vendorEmail } = req.query;
    const query = vendorEmail ? { vendorEmail } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (vendor)
export const editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (vendor)
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
