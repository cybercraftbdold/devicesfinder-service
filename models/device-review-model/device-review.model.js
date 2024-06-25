const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mobileReviewImageSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    altText: { type: String, required: true },
    caption: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Define the main schema for Mobile Specification
const deviceReviewSchema = new Schema(
  {
    title: String,
    deviceId: String,
    reviewStatus: String,
    image: mobileReviewImageSchema,
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
