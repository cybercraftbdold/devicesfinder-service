const { default: mongoose } = require("mongoose");
const deleteItem = require("../../helpers/service-helpers/deleteItem");
const MobileSpecificationModel = require("../../models/specification-model/specification.model");
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
      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
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

// create user review
const createUserReviewService = async (payload) => {
  let { name, email, rating, description, deviceId, reviewStatus } = payload;

  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const userReviewModel = new UserReviewModel({
      name,
      email,
      rating,
      description,
      deviceId,
      reviewStatus,
    });
    // Attempt to save the new blog post to the database
    const res = await userReviewModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "User review create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// delete user review
const deleteUserReviewService = async (id) => {
  return await deleteItem(id, UserReviewModel);
};
module.exports = {
  getUserReviewsService,
  createUserReviewService,
  deleteUserReviewService,
};
