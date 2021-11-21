const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const User = require("../../models/user");

router.post("/signup", async (req, res, next) => {
  try {
    let result;

    if (req.files) {
      let file = req.files.photo;

      result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "users",
        width: 150,
        crop: "scale",
      });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new Error("All fields are mandatory"));
    }

    await User.create({
      name,
      email,
      password,
      photo: {
        id: result.public_id,
        secure_url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Register successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
