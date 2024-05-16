const { Schema, model } = require("mongoose");

// profile keyword model
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

// blog post keyword
const mobileBlogKeywordSchema = new Schema(
  {
    mainKeyword: {
      type: String,
      require: true,
    },
    relevantKeyword: {
      type: String,
      require: true,
    },
    relevantUrl: {
      type: String,
      require: true,
    },
    types: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const MobileProfileKeywordModel = model(
  "mobile-profile-keyword",
  mobileKeywordInfoSchema
);
const MobileBlogKeywordModel = model(
  "mobile-blog-keyword",
  mobileBlogKeywordSchema
);
module.exports = { MobileProfileKeywordModel, MobileBlogKeywordModel };
