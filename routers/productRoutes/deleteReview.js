const express = require("express");
const userAuth = require("../../middlewares/userAuth");
const Product = require("../../models/productModel");
const router = express.Router();

router.delete("/review", userAuth, async (req, res) => {
  try {
    const { productID } = req.query;

    //find product
    const product = await Product.findById(productID);

    //check there is a review or not for specific product
    const review = product.reviews.filter(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    //adjust ratings
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await Product.findByIdAndUpdate(
      productID,
      {
        reviews,
        ratings,
        numberofReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    //sending responce
    res.status(201).json({
      success: true,
      message: "review deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
