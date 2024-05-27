const MobileManufactureModel = require("../../models/mobile-specification/mobile.manufacture.model");

const createMobileManufactureService = async (payload) => {
  try {
    const mobileKeywordModel = new MobileManufactureModel(payload);

    // Attempt to save the new blog post to the database
    const res = await mobileKeywordModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Manufacture created successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile  Manufacture
const getMobileManufactureService = async (
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
        { manufactureName: { $regex: searchText, $options: "i" } },
        { manufactureWebsite: { $regex: searchText, $options: "i" } },
        { manufactureEmail: { $regex: searchText, $options: "i" } },
      ];
    }
    // Apply filters if they are provided
    if (filters) {
      if (filters.status) {
        query.status = filters.status;
      }
    }
    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileManufactureModel.aggregate([
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

module.exports = {
  createMobileManufactureService,
  getMobileManufactureService,
};
