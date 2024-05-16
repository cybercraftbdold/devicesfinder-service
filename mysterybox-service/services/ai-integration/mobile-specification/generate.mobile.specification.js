const aiMobileSpecificationModel = require("../../../models/ai-integration/mobile-specification-model/mobile.specification");

const mobileSpecificationAiContentService = async (payload) => {
  try {
    const reivew = await aiMobileSpecificationModel.create(payload);
    return {
      isSuccess: true,
      message: "Review posted successfully completed",
      reivew,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  mobileSpecificationAiContentService,
};
