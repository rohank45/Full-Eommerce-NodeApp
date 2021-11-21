const express = require("express");
const router = express.Router();

router.get("/oauth/logout", (req, res) => {
  req.logOut;

  res.redirect("/oauth/login");
});

module.exports = router;
