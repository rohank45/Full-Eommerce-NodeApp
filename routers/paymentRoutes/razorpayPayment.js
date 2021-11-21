const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");

router.post("/razorpayPayment", userAuth, async (req, res, next) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    var options = {
      amount: req.body.amount,
      currency: "INR",

      //create a token or unique id as a receipt using crypto or uuid
      receipt: "receipt#1",
    };

    const myOrder = await instance.orders.create(options);

    res.status(201).json({
      success: true,
      amount: req.body.amount,
      order: myOrder,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
