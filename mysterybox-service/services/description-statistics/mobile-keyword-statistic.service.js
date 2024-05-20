const MobileFaqModel = require("../../models/mobile-specification/mobile.faq.model");
const MobileSpecificationContentModel = require("../../models/mobile-specification/mobile.specification.model");
const UserReviewModel = require("../../models/user-review/user.reivew.model");

const getKeywordCountService = async (filters) => {
  try {
    const userReviewModel = UserReviewModel;
    const mobileFaqModel = MobileFaqModel;
    const mobileSpecificationContentModel = MobileSpecificationContentModel;

    let query = {};
    // Apply filters if they are provided
    if (filters && filters.phoneId) {
      query["mobileInfo.phoneId"] = filters.phoneId;
    }

    const mobileFaqCount = await mobileFaqModel.countDocuments(query);
    const userReviewCount = await userReviewModel.countDocuments(query);
    const mobileSpecificationContentCount =
      await mobileSpecificationContentModel.countDocuments(query);

    return {
      isSuccess: true,
      message: "Data getting successful",
      counts: {
        mobileFaqCount,
        mobileSpecificationContentCount,
        userReviewCount,
      },
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  getKeywordCountService,
};
