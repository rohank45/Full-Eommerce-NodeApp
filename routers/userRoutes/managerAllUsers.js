const User = require("../../models/user");
const customRole = require("../../middlewares/customRole");
const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");

router.get("/manager", userAuth, customRole("manager"), async (req, res) => {
  const users = await User.find({ role: "user" });

  res.status(201).json({
    success: true,
    users,
  });
});

module.exports = router;
