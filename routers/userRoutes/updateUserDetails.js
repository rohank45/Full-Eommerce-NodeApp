const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");

const userAuth = require("../../middlewares/userAuth");
const User = require("../../models/user");
const cookieToken = require("../../utils/cookieToken");

router.post("/updateUserDetails", userAuth, async (req, res) => {
  try {
    const newData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.files) {
      const user = User.findById(req.user.id);

      const imageID = user.photo.id;
      await cloudinary.v2.uploader.destroy(imageID);

      const result = await cloudinary.v2.uploader.upload(
        req.files.photo.tempFilePath,
        {
          folder: "users",
          width: 150,
          crop: "scale",
        }
      );

      newData.photo = {
        id: result.public_id,
        secure_url: result.secure_url,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
      new: true,
      reunValidators: true,
      useFindAndModify: false,
    });

    cookieToken(user, res);

    res.status(201).json({
      success: true,
      message: "User details Changed successfully",
    });
  } catch (error) {
    return next(new Error(err));
  }
});

module.exports = router;
