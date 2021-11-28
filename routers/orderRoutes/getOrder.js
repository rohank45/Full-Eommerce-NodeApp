const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const Order = require("../../models/orderModel");

router.get("/getOrder/:id", userAuth, async (req, res, next) => {
  try {
    const order = await Order.findOne(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return next(new Error("please check order id"), 400);
    }

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new Error(error));
  }
});

module.exports = router;
