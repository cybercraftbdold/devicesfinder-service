const { Schema, model } = require("mongoose");

const mobileComparisonSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    phoneIds: {
      type: [String],
      required: true,
    },
    phones: {
      type: Schema.Types.Array,
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
