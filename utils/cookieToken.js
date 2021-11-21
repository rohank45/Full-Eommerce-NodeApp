const cookieToken = (user, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    htppOnly: true,
  };

  user.password = undefined;

  res.status(201).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
