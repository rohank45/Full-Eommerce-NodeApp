const express = require("express");
const router = express.Router();
const Product = require("../../models/productModel");
const userAuth = require("../../middlewares/userAuth");

router.get("/getProductDetails/:id", userAuth, async (req, res, next) => {
  try {
    const productID = req.params.id;

    if (!productID) {
      return next(new Error("Product id not found", 401));
    }

    const productDetails = await Product.findById(productID);

    res.status(201).json({
      success: true,
      productDetails,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
