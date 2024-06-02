const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const reivewSchema = new Schema(
  {
    specificationId: String,
    name: String,
    email: String,
    rating: Number,
    description: String,
  },
  { timestamps: true }
);

const UserReviewModel = mongoose.model("user-review", reivewSchema);

module.exports = UserReviewModel;
