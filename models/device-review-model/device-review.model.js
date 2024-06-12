const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const deviceReviewSchema = new Schema(
  {
    title: String,
    description: String,
    metaInformation: {
      canonicalUrl: String,
      mainKeyword: String,
      metaDescription: String,
      metaTitle: String,
      seedKeyword: [String],
    },
  },
  { timestamps: true }
);

const DeviceReviewModel = mongoose.model("deviceReview", deviceReviewSchema);

module.exports = DeviceReviewModel;
