const { Schema, model } = require("mongoose");

const manageWebsiteSchema = new Schema(
  {
    websiteName: {
      type: String,
      require: true,
      unique: true,
    },
    websiteUrl: {
      type: String,
      require: true,
      unique: true,
    },
    status: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const WebsiteModelModel = model("website", manageWebsiteSchema);
module.exports = WebsiteModelModel;
