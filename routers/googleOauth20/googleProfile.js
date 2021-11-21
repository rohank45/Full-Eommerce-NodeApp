const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // res.redirect("/");
    res.send(req.user);
  }
);

module.exports = router;
