const express = require("express");
const router = express.Router();

const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
  (req, res) => {
    res.send("login with google");
  }
);

module.exports = router;
