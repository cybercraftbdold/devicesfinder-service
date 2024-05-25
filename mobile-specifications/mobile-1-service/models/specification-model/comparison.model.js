const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const comparisonSchema = new Schema(
  {
    title: String,
    specificationId: String,
    phones: [
      {
        // specificationId: String,
        title: String,
        specification: Schema.Types.Mixed,
      },
    ],
    metaInformation: Schema.Types.Mixed,
  },
  { timestamps: true }
);

const ComparisonModel = mongoose.model("comparison", comparisonSchema);

module.exports = ComparisonModel;
