const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer", "");

  if (!token) {
    return next(new Error("Login first to access this page"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);

  req.user = await User.findById(decoded.id);

  next();
};

module.exports = userAuth;
