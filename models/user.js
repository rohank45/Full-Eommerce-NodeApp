const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  photo: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "please provide valid email"],
    required: [true, "please provide email"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "please provide name"],
    minlength: [6, "password should be atleast 6"],
  },
  role: {
    type: String,
    default: "user",
  },
  forgetPassToken: String,
  forgetPassExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encryption on pass field
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

//validate the password with user's password
userSchema.methods.isValidatePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//create and return token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//generating forget pass token
userSchema.methods.getForgetPasswordToken = function () {
  const generateToken = crypto.randomBytes(20).toString("hex");

  this.forgetPassToken = crypto
    .createHash("sha256")
    .update(generateToken)
    .digest("hex");

  this.forgetPassExpiry = Date.now() + 20 * 60 * 1000;

  return generateToken;
};

module.exports = mongoose.model("User", userSchema);
