const mongoose = require("mongoose");
const metaInforamtionSchema = require("../../helpers/common-schema/metaInformationSchema");
const Schema = mongoose.Schema;

// Schema for Buying Guide
const buyingGuideSchema = new Schema(
  {
    title: String,
    deviceId: String,
    reviewStatus: String,
    description: String,
    metaInformation: metaInforamtionSchema,
  },
  { timestamps: true }
);

const BuyingGuideModel = mongoose.model("buying-guide", buyingGuideSchema);

module.exports = BuyingGuideModel;
