const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const Order = require("../../models/orderModel");

router.post("/addOrder", userAuth, async (req, res, next) => {
  try {
    //collecting order details from USER
    const {
      shippingInfo,
      orderDetails,
      paymentInfo,
      taxAmount,
      shippingAmount,
      totalAmount,
    } = req.body;

    //input fields validation
    if (
      !shippingInfo ||
      !orderDetails ||
      !paymentInfo ||
      !taxAmount ||
      !shippingAmount ||
      !totalAmount
    ) {
      return next(new Error("All fields are mandatory for creating order."));
    }

    //saving order to DB
    const order = await Order.create({
      shippingInfo,
      orderDetails,
      paymentInfo,
      taxAmount,
      shippingAmount,
      totalAmount,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "order Created successfully",
      order,
    });
  } catch (error) {
    return next(new Error(error));
  }
});

module.exports = router;
