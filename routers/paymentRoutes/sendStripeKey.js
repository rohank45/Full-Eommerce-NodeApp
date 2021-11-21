const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");

//sending StripeKey to frontend
router.get("/stripeKey", userAuth, (req, res, next) => {
  res.status(200).json({
    stripe_key: process.env.STRIPE_API_KEY,
  });
});

module.exports = router;
