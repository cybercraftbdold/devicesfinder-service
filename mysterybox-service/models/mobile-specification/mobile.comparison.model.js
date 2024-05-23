const { Schema, model } = require("mongoose");

const phoneDetailSchema = new Schema(
  {
    specificationId: String,
    title: String,
    specification: Schema.Types.Mixed,
  },
  { _id: false }
);
const mobileComparisonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    phones: [phoneDetailSchema],
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

const MobileComparisonModel = model(
  "mobile-comparison",
  mobileComparisonSchema
);
module.exports = MobileComparisonModel;
