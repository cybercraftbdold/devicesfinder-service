const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Buying Guide
const buyingGuideSchema = new Schema(
  {
    title: String,
    deviceId: String,
    description: String,
  },
  { timestamps: true }
);

const BuyingGuideModel = mongoose.model("buying-guide", buyingGuideSchema);

module.exports = BuyingGuideModel;
