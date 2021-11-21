const express = require("express");
const router = express.Router();
const Product = require("../../models/productModel");
const cloudinary = require("cloudinary");
const userAuth = require("../../middlewares/userAuth");
const customRole = require("../../middlewares/customRole");

router.put(
  "/getProductDetails/update/:id",
  userAuth,
  customRole("admin"),
  async (req, res, next) => {
    try {
      let productID = req.params.id;
      let imagesArray = [];

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

        //adding images
        for (let index = 0; index < req.files.photos.length; index++) {
          let results = await cloudinary.v2.uploader.upload(
            images.photos[index].tempFilePath,
            {
              folder: "products",
            }
          );
          imagesArray.push({
            id: results.public_id,
            secure_url: results.secure_url,
          });
        }
      }

      req.body.photos = imagesArray;

      productDetails = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );

      res.status(201).json({
        success: true,
        productDetails,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
