const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const mailHelper = require("../../utils/mailHelper");

router.post("/forgotPassword", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next(new Error("please fill email field"));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new Error("email not found"));
    }

    const forgotToken = user.getForgetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get(
      "host"
    )}/resetPassword/${forgotToken}`;

    const message = `Copy Paste this link and hit enter to reset password. \n\n ${url}`;

    try {
      await mailHelper({
        email: user.email,
        subject: "Ecomm Reset Password",
        message,
      });

      res.status(201).json({
        success: true,
        message: "Email sent successfully",
      });
    } catch (error) {
      (user.forgetPassToken = undefined), (user.forgetPassExpiry = undefined);

      await user.save({ validateBeforeSave: false });

      console.log(error);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
