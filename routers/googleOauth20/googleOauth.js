const express = require("express");
const router = express.Router();

const passport = require("passport");

//for login with google oauth 2.0

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
