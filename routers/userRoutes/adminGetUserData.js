const User = require("../../models/user");
const customRole = require("../../middlewares/customRole");
const express = require("express");
const router = express.Router();
const userAuth = require("../../middlewares/userAuth");

router.get("/admin/:id", userAuth, customRole("admin"), async (req, res) => {
  const users = await User.findById(req.params.id);

  res.status(201).json({
    success: true,
    users,
  });
});

module.exports = router;
