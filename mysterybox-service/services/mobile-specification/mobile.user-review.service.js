const UserReviewModel = require("../../models/user-review/user.reivew.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");
// generate mobile user review content using  open ai
const generateMobileUserReviewService = async (payload) => {
  // let { title, status, user review, metaInformation } = payload;
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
// create mobile user review after generate mobile user review content using open ai
const createMobileUserReviewService = async (payload) => {
  let { name, email, rating, description, mobileInfo, websiteInfo } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileUserReviewModel = new UserReviewModel({
      name,
      email,
      rating,
      description,
      mobileInfo,
      websiteInfo,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileUserReviewModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile user review create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile user review fa
const getMobileUserReviewService = async (
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
      query.$or = [{ name: { $regex: searchText, $options: "i" } }];
    }
    // apply filters if they are provided
    if (filters) {
      // Check phoneId
      if (filters.phoneId) {
        query["mobileInfo.phoneId"] = filters.phoneId;
      }
      // if (filters.status) {
      //   query.status = filters.status;
      // }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await UserReviewModel.aggregate([
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
  generateMobileUserReviewService,
  createMobileUserReviewService,
  getMobileUserReviewService,
};
