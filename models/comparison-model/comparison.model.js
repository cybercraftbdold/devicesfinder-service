const mongoose = require("mongoose");
const metaInforamtionSchema = require("../../helpers/common-schema/metaInformationSchema");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const comparisonSchema = new Schema(
  {
    title: String,
    ratings: {
      type: [Object],
      required: true,
    },
    specificationId: String,
    deviceId: {
      type: String,
      required: true,
    },
    reviewStatus: {
      type: String,
      required: true,
    },
    images: Schema.Types.Mixed,
    viewCount: { type: Number, default: 0 },
    phones: [
      {
        title: String,
        image: {
          imageUrl: {
            type: String,
            required: true,
          },
          altText: String,
          caption: String,
          description: String,
        },
        specification: Schema.Types.Mixed,
        canonicalUrl: {
          type: String,
          required: true,
        },
      },
    ],
    metaInformation: metaInforamtionSchema,
  },
  { timestamps: true }
);

const ComparisonModel = mongoose.model("comparison", comparisonSchema);

module.exports = ComparisonModel;