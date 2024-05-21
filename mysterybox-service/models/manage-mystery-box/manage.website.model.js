const { Schema, model } = require("mongoose");

const manageWebsiteSchema = new Schema(
  {
    websiteName: {
      type: String,
    },
    websiteUrl: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const WebsiteModelModel = model("website", manageWebsiteSchema);
module.exports = WebsiteModelModel;
