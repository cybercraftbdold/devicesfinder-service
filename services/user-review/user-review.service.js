const UserReviewModel = require("../../models/specification-model/user-review.model");

// get all user review service and filter by specificationid
const getUserReviewsService = async (
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
        { mainKeyword: { $regex: searchText, $options: "i" } },
        { relevantKeyword: { $regex: searchText, $options: "i" } },
      ];
    }
    // apply filters if they are provided
    if (filters) {
      if (filters.specificationId) {
        query.specificationId = filters.specificationId;
      }
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
  getUserReviewsService,
};
