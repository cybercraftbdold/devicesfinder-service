const { Schema, model } = require("mongoose");

const userReviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mobileInfo: {
      phoneId: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserReviewModel = model("user-review", userReviewSchema);
module.exports = UserReviewModel;
