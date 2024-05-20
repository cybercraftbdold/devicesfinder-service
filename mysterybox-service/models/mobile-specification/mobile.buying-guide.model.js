const { Schema, model } = require("mongoose");
const mobileBuyingGuideSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mobileInfo: {
      phoneId: String,
    },
  },
  {
    timestamps: true,
  }
);

const MobileBuyingGuideModel = model(
  "mobile-buying-guide",
  mobileBuyingGuideSchema
);
module.exports = MobileBuyingGuideModel;
