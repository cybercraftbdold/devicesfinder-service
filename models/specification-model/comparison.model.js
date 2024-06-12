const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const comparisonSchema = new Schema(
  {
    title: String,
    specificationId: String,
    deviceId: {
      type: String,
      required: true,
    },
    images: Schema.Types.Mixed,
    viewCount: { type: Number, default: 0 },
    phones: [
      {
        title: String,
        image: String,
        specification: Schema.Types.Mixed,
      },
    ],
    metaInformation: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const ComparisonModel = mongoose.model("comparison", comparisonSchema);

module.exports = ComparisonModel;
