const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const Product = require("../../models/productModel");
const userAuth = require("../../middlewares/userAuth");
const customRole = require("../../middlewares/customRole");

router.post(
  "/addProduct",
  userAuth,
  customRole("admin"),
  async (req, res, next) => {
    try {
      const imageArray = [];

      const images = req.files;

      if (!images) {
        return next(new Error("please provide images of Product"));
      }

      if (images) {
        for (let index = 0; index < images.photos.length; index++) {
          let result = await cloudinary.v2.uploader.upload(
            images.photos[index].tempFilePath,
            {
              folder: "products",
            }
          );

          imageArray.push({
            id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      }

      req.body.photos = imageArray;
      req.body.user = req.user.id;

      const product = await Product.create(req.body);

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
