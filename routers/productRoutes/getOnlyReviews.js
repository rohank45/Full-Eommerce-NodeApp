const express = require("express");
const userAuth = require("../../middlewares/userAuth");
const Product = require("../../models/productModel");
const router = express.Router();

router.get("/reviews", userAuth, async (req, res) => {
  try {
    //find product
    const product = await Product.findById(req.query.id);

    //sending responce
    res.status(201).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
