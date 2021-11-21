const customRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error("You are not allowed to access for this resource.")
      );
    }

    next();
  };
};

module.exports = customRole;
