const MobileImageModel = require("../../models/mobile-specification/mobile.image.model");

const createMobileImageService = async (payload) => {
  try {
    const isExistingBuyingGuide = await MobileImageModel.find({
      "mobileInfo.phoneId": payload?.mobileInfo?.phoneId,
    });
    if (isExistingBuyingGuide?.length > 0) {
      return {
        isSuccess: false,
        message: "Already have an images for the same mobile keyword!",
      };
    }
    const mobileImageModel = new MobileImageModel(payload);
    const res = await mobileImageModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Image created successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile  Image
const getMobileImageService = async (
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
        { "mobileInfo.phoneId": { $regex: searchText, $options: "i" } },
      ];
    }
    // Apply filters if they are provided
    if (filters) {
      if (filters.phoneId) {
        query["mobileInfo.phoneId"] = filters.phoneId;
      }
    }
    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileImageModel.aggregate([
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
        response: res,
        totalCount: res[0].totalCount[0] ? res[0].totalCount[0].value : 0,
        message: "Data retrieval successful",
      };
    }
  } catch (error) {
    console.error("Error during data retrieval:", error);
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// delete image
const deleteMobileImageService = async (id) => {
  try {
    const res = await MobileImageModel.findByIdAndDelete({ _id: id });
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Delete Sucessfully Completed",
      };
    } else {
      return { isSuccess: false, message: "Data Not Found" };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  createMobileImageService,
  getMobileImageService,
  deleteMobileImageService,
};
