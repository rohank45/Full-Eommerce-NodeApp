const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
  },
});

module.exports = mongoose.model("GoogleUser", googleUserSchema);
