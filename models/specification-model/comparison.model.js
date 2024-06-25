const mongoose = require("mongoose");
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
      },
    ],
    metaInformation: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const ComparisonModel = mongoose.model("comparison", comparisonSchema);

module.exports = ComparisonModel;
