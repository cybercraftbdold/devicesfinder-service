const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const comparisonSchema = new Schema(
  {
    title: String,
    specificationId: String,
    deviceId: {
      type: String,
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
