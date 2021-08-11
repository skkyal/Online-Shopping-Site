import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc : Find all Products
// @route : /api/products
// @access : Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc : Find a Product
// @route : /api/products/:id
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

export { getProducts, getProductById };
