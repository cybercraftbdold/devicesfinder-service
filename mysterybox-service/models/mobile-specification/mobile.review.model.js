const { Schema, model } = require("mongoose");

const mobileReviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mobileInfo: {
      phoneId: {
        type: String,
        required: true,
      },
    },
    websiteInfo: {
      websiteName: {
        type: String,
        required: true,
      },
      websiteId: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    metaInformation: {
      canonicalUrl: String,
      mainKeyword: String,
      metaDescription: String,
      metaTitle: String,
      seedKeyword: [String],
    },
  },
  {
    timestamps: true,
  }
);

const MobileReviewModel = model("mobile-review", mobileReviewSchema);
module.exports = MobileReviewModel;
