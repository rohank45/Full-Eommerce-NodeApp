const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");

//sending RazorpayKey to frontend
router.get("/razorpayKey", userAuth, (req, res, next) => {
  res.status(200).json({
    razorpay_key: process.env.RAZORPAY_API_KEY,
  });
});

module.exports = router;
