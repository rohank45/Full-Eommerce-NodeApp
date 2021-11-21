const express = require("express");
const userAuth = require("../../middlewares/userAuth");
const Product = require("../../models/productModel");
const router = express.Router();

router.put("/review", userAuth, async (req, res, next) => {
  try {
    const { rating, comment, productID } = req.body;

    if (!comment) {
      return next(new Error("please provide comment"));
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    //find product
    const product = await Product.findById(productID);

    //check there is a review or not for specific product
    const alreadyReview = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    //add review or update review
    if (alreadyReview) {
      product.reviews.forEach((reviewP) => {
        if (reviewP.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numberofReviews = product.reviews.length;
    }

    //adjust ratings
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    //saving review
    await product.save({ validateBeforeSave: false });

    //sending responce
    res.status(201).json({
      success: true,
      message: "review added",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
