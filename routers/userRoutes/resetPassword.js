const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../../models/user");

router.post("/resetPassword/:token", async (req, res, next) => {
  try {
    const token = req.params.token;

    const encrypToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      encrypToken,
      forgetPassExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new Error("Token is expired"));
    }

    if (req.body.password !== req.body.cpassword) {
      return next(new Error("password and confirm password not matching"));
    }

    user.password = req.body.password;

    user.forgetPassToken = undefined;
    user.forgetPassExpiry = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return next(new Error(err));
  }
});

module.exports = router;
