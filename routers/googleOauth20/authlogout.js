const express = require("express");
const router = express.Router();

router.get("/auth/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;
