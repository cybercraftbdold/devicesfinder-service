const {
  MobileProfileKeywordModel,
  MobileBlogKeywordModel,
} = require("../../models/mobile-specification/mobile.keyword.model");

// create mobile specification
const createMobileProfileKeywordService = async (payload) => {
  let { keywords, profile, vendor, types, features } = payload;
  try {
    const mobileKeywordModel = new MobileProfileKeywordModel({
      keywords,
      profile,
      vendor,
      types,
      features,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileKeywordModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile profile keyword created successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// create mobile blog keyword
const createMobileBlogKeywordService = async (payload) => {
  let { mainKeyword, relevantKeyword, relevantUrl, types, features } = payload;
  try {
    const mobileKeywordModel = new MobileBlogKeywordModel({
      mainKeyword,
      relevantKeyword,
      relevantUrl,
      types,
      features,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileKeywordModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile blog keyword created successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  createMobileProfileKeywordService,
  createMobileBlogKeywordService,
};
