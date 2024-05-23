const MobileReviewModel = require("../../models/mobile-specification/mobile.review.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");

// generate mobile review  using  open ai
const generateMobileReviewService = async (payload) => {
  const generatedContent = await generateMobileSpecification(payload);
  try {
    if (generatedContent) {
      return {
        isSuccess: true,
        response: generatedContent,
        message: "Content generated successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// create mobile review after generate mobile review content using open ai
const createMobileReviewService = async (payload) => {
  let { title, description, metaInformation, mobileInfo, websiteInfo } =
    payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileReviewModel = new MobileReviewModel({
      title,
      description,
      mobileInfo,
      websiteInfo,
      metaInformation,
    });

    // check Already have an review
    const isExistingMobileReview = await MobileReviewModel.find({
      "mobileInfo.phoneId": mobileInfo.phoneId,
    });
    if (isExistingMobileReview?.length > 0) {
      return {
        isSuccess: false,
        message: "Already have an review for the same mobile keyword!",
      };
    }
    // Attempt to save the new blog post to the database
    const res = await mobileReviewModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile review create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile review
const getMobileReviewService = async (
  limit,
  skip,
  searchText,
  filters,
  sortField = "createdAt",
  sortOrder = "desc"
) => {
  try {
    let query = {};
    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }
    // apply filters if they are provided
    if (filters) {
      // Check phoneId
      if (filters.phoneId) {
        query["mobileInfo.phoneId"] = filters.phoneId;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileReviewModel.aggregate([
      { $match: query },
      // { $sort: { createdAt: -1 } },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "value" }],
        },
      },
    ]);
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Data getting successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  generateMobileReviewService,
  createMobileReviewService,
  getMobileReviewService,
};
