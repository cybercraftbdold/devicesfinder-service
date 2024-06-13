const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const reivewSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    deviceId: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const UserReviewModel = mongoose.model("user-review", reivewSchema);

module.exports = UserReviewModel;
