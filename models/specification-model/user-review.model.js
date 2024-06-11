const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const reivewSchema = new Schema(
  {
    specificationId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    rating: {
      type: Double,
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
