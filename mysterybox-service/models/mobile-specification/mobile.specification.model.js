const { Schema, model } = require("mongoose");

const mobileSpecificationContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mobileInfo: {
      phoneId: String,
    },
    status: {
      type: String,
      required: true,
    },
    specification: {
      type: Schema.Types.Mixed,
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

const MobileSpecificationContentModel = model(
  "mobile-specification",
  mobileSpecificationContentSchema
);
module.exports = MobileSpecificationContentModel;
