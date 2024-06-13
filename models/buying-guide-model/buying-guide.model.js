const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Buying Guide
const buyingGuideSchema = new Schema(
  {
    title: String,
    deviceId: String,
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

const BuyingGuideModel = mongoose.model("buying-guide", buyingGuideSchema);

module.exports = BuyingGuideModel;
