const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const cookieToken = require("../../utils/cookieToken");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("All fields are mandatory"));
    }

    //checking email
    const verifyEmail = await User.findOne({ email: email }).select(
      "+password"
    );
    if (!verifyEmail) {
      return next(new Error("Wrong Credentials"));
    }

    //checking password
    const verifyPassword = await verifyEmail.isValidatePassword(password);
    if (!verifyPassword) {
      return next(new Error("Wrong Credentials"));
    }

    //if all things are right
    cookieToken(verifyEmail, res);

    res.status(201).json({
      success: true,
      message: "Login successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
