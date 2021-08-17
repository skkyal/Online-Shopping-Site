import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc : Create New Order
// @route : /api/orders
// @access : Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Item");
    return;
  } else {
    const order = new Order({
      shippingAddress,
      orderItems,
      user: req.user._id,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

export { addOrderItems };
