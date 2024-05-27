const { Schema, model } = require("mongoose");

// profile keyword model
const mobileKeywordInfoSchema = new Schema(
  {
    deviceTitle: {
      type: String,
      require: true,
    },
    deviceType: {
      type: String,
      require: true,
    },
    deviceSubType: {
      type: String,
      require: true,
    },
    relevantUrl: {
      type: [String],
      require: true,
    },

    keyword: {
      mainKeyword: {
        type: String,
        require: true,
      },
      releventKeyword: {
        type: [String],
        require: true,
      },
    },
    // manucature information
    manufacture: {
      manufactureName: {
        type: String,
        require: true,
      },
      manufactureWebsite: {
        type: String,
        require: true,
      },
      manufacturePhone: {
        type: String,
        require: true,
      },
      manufactureSocial: {
        type: [String],
        require: true,
      },
      manufactureEmail: {
        type: [String],
        require: true,
      },
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
      type: [String],
      require: true,
    },
    types: {
      type: [String],
      require: true,
    },
    websiteInfo: {
      websiteName: String,
      websiteId: String,
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
