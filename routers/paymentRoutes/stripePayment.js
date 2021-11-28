const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userAuth = require("../../middlewares/userAuth");

router.post("/stripePayment", userAuth, async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",

      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      amount: req.body.amount,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    return next(new Error(error));
  }
});

module.exports = router;
