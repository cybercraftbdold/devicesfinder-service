const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const DeviceReviewModel = require("../../models/device-review-model/device-review.model");

// Create Device Review
const createDeviceReviewService = async (payload) => {
  let { title, deviceId, reviewStatus, image, description, metaInformation } =
    payload;

  try {
    const duplicateDeviceReview = await DeviceReviewModel.findOne({ deviceId });

    // If device review exists update that
    if (duplicateDeviceReview)
      return await updateWithDeviceIdService(
        payload,
        DeviceReviewModel,
        "Device Review"
      );

    // Proceed to create a new DeviceReviewModel instance with the provided payload
    const deviceReview = new DeviceReviewModel({
      title,
      deviceId,
      reviewStatus,
      image,
      description,
      metaInformation,
    });

    // Attempt to save the new blog post to the database
    const newDeviceReview = await deviceReview.save();

    if (newDeviceReview) {
      return {
        isSuccess: true,
        response: newDeviceReview,
        message: "Device Review published successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get Device Review
const getDeviceReviewService = async (
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
      query.$or = [{ title: { $regex: searchText, $options: "i" } }];
    }

    // Apply filters if they are provided
    if (filters) {
      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await DeviceReviewModel.aggregate([
      { $match: query },
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
        response: res[0],
        message: "Data getting successful",
      };
    } else {
      return {
        isSuccess: true,
        response: [],
        message: "No data found",
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
  createDeviceReviewService,
  getDeviceReviewService,
};
