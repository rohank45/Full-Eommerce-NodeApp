const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");
const User = require("../../models/user");

router.get("/userDashboard", userAuth, async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(201).json({
    success: true,
    user,
  });
});

module.exports = router;
