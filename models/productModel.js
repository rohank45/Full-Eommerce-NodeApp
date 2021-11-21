const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  photos: [
    {
      id: {
        type: String,
        require: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    trim: true,
    required: [true, "please provide product name."],
  },
  price: {
    type: Number,
    required: [true, "please provide product price."],
    maxlength: 6,
  },
  description: {
    type: String,
    required: [true, "please provide product description."],
  },
  category: {
    type: String,
    required: [true, "please select a category."],
    enum: {
      values: [
        "shortSleeves",
        "longSleeves",
        "sweatShirts",
        "hoodies",
        "shirts",
      ],
    },
  },
  brand: {
    type: String,
    required: [true, "please add a brand for clothing."],
  },
  stock: {
    type: Number,
    required: [true, "please provide product stock."],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberofReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        require: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
