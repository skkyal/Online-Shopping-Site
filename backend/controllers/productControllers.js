import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc : Find all Products
// @route : GET /api/products
// @access : Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc : Find a Product
// @route : GET /api/products/:id
// @access : Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// @desc : Delete a Product
// @route : DELETE /api/products/:id
// @access : Public/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductById, deleteProduct };
