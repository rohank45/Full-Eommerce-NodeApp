const express = require("express");
const router = express.Router();
const Product = require("../../models/productModel");
const cloudinary = require("cloudinary");
const userAuth = require("../../middlewares/userAuth");
const customRole = require("../../middlewares/customRole");

router.delete(
  "/deleteProduct/:id",
  userAuth,
  customRole("admin"),
  async (req, res, next) => {
    try {
      const productID = req.params.id;

      if (!productID) {
        return next(new Error("Product id not found", 401));
      }

      if (req.files) {
        //deleting images
        for (let index = 0; index < productID.photos.length; index++) {
          const result = cloudinary.v2.uploader.destroy(
            productID.photos[index].id
          );
        }
      }

      const product = await Product.findById(productID);

      //deleting user from db
      await product.remove();

      res.status(201).json({
        success: true,
        message: "Product was deleted.",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
