const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const BuyingGuideModel = require("../../models/buying-guide-model/buying-guide.model");

// Create Buying Guide
const createBuyingGuideService = async (payload) => {
  let { title, deviceId, reviewStatus, description, metaInformation } = payload;

  try {
    const duplicateBuyingGuide = await BuyingGuideModel.findOne({ deviceId });

    // If buying guide exists update that
    if (duplicateBuyingGuide)
      return await updateWithDeviceIdService(
        payload,
        BuyingGuideModel,
        "Buying Guide"
      );

    // Proceed to create a new BuyingGuideModel instance with the provided payload
    const buyingGuide = new BuyingGuideModel({
      title,
      deviceId,
      reviewStatus,
      description,
      metaInformation,
    });

    // Attempt to save the buying guide to the database
    const newBuyingGuide = await buyingGuide.save();

    if (newBuyingGuide) {
      return {
        isSuccess: true,
        response: newBuyingGuide,
        message: "Buying Guide published successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get All Buying Guide
const getAllBuyingGuideService = async (
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

    const res = await BuyingGuideModel.aggregate([
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
  createBuyingGuideService,
  getAllBuyingGuideService,
};
