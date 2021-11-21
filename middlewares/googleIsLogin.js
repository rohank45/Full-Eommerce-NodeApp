const googleIsLogin = (req, res, next) => {
  if (!req.user) {
    res.redirect("/oauth/login");
  }
  next();
};

module.exports = googleIsLogin;
