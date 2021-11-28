const express = require("express");
const router = express.Router();

const passport = require("passport");

//for getting data after login with google oauth 2.0

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
