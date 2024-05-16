const { Schema, model } = require("mongoose");

const mobileKeywordInfoSchema = new Schema(
  {
    keywords: {
      mainKeyword: String,
      relevantKeyword: String,
    },

    profile: {
      profileTitle: String,
      relevantURL: String,
    },

    vendor: {
      vendorName: String,
      vendorPhone: String,
      vendorEmail: String,
      vendorWebsite: String,
      vendorSocial: String,
    },
    featured: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const MobileKeywordModel = model("mobile-keyword", mobileKeywordInfoSchema);
module.exports = MobileKeywordModel;
