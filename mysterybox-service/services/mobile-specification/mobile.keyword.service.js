const MobileKeywordModel = require("../../models/mobile-specification/mobile.keyword.model");

// create mobile specification
const createMobileProfileKeywordService = async (payload) => {
  let { keywords, profile, vendor, featured } = payload;
  try {
    const mobileKeywordModel = new MobileKeywordModel({
      keywords,
      profile,
      vendor,
      featured,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileKeywordModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile profile created successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

//

module.exports = {
  createMobileProfileKeywordService,
};
