const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const reivewSchema = new Schema(
  {
    name: String,
    email: String,
    deviceId: String,
    reviewStatus: String,
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    description: String,
  },
  { timestamps: true }
);

const UserReviewModel = mongoose.model("user-review", reivewSchema);

module.exports = UserReviewModel;
