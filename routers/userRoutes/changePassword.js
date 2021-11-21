const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const User = require("../../models/user");
const cookieToken = require("../../utils/cookieToken");

router.post("/changePassword", userAuth, async (req, res) => {
  try {
    const oldPassword = req.body.oldPassword;
    const newpassword = req.body.newPassword;

    if (!oldPassword || !newpassword) {
      return next(new Error("Fields are empty"));
    }

    const userID = req.user.id;

    const user = await User.findById(userID).select("+password");

    const isCorrectOldPassword = await user.isValidatePassword(oldPassword);

    if (!isCorrectOldPassword) {
      return next(new Error("Old password is wrong"));
    }

    user.password = newpassword;

    await user.save();

    cookieToken(user, res);

    res.status(201).json({
      success: true,
      message: "Password Changed successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;