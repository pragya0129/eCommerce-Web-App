const express = require("express");
const router = express.Router();
const Product = require("../models/productModel"); // path may vary
// @route   POST /api/products
// @desc    Add new product (Admin only)
router.post("/", async (req, res) => {
  try {
    const { name, description, image, price, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      image,
      price,
      category,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error adding product", error: err.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product by ID (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error deleting product", error: err.message });
  }
});

const {
  getAllProducts,
  getProductById,
  getAllCategories,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/categories/all", getAllCategories);

module.exports = router;
