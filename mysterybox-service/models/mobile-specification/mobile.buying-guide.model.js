const { Schema, model } = require("mongoose");
const mobileBuyingGuideSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: Schema.Types.Mixed,
      required: true,
    },
    mobileInfo: {
      phoneId: {
        type: String,
        required: true,
      },
    },
    websiteInfo: {
      websiteName: {
        type: String,
        required: true,
      },
      websiteId: {
        type: String,
        required: true,
      },
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
