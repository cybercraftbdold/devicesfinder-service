const ReviewModel = require("../../models/review-model/review.model");
// create user
const createMobileReview = async (payload) => {
  try {
    const reivew = await ReviewModel.create(payload);
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
// get all users service
const getAllReviewService = async (limit, skip = 0, searchText, filters) => {
  try {
    let query = {};
    if (searchText) {
      query.$or = [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
      ];
    }
    const aggregationPipeline = [
      { $match: query },
      {
        $facet: {
          users: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "total" }],
        },
      },
    ];

    const [result] = await ReviewModel.aggregate(aggregationPipeline);
    const totalUsers = result.totalCount[0] ? result.totalCount[0].total : 0;

    return {
      isSuccess: true,
      users: result.users,
      totalUsers,
    };
  } catch (error) {
    console.error("Error fetching users:");
    return {
      isSuccess: false,
      message: "Failed to fetch users",
    };
  }
};

module.exports = {
  createMobileReview,
  getAllReviewService,
};
