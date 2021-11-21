const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");

router.get("/logout", userAuth, (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(201).json({
    success: true,
    message: "Logout successfully",
  });
});

module.exports = router;
