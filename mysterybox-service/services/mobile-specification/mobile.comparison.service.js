const MobileComparisonModel = require("../../models/mobile-specification/mobile.comparison.model");

// create mobile comparison  mobile comparison content
const createMobileComparisonService = async (payload) => {
  let { title, phones, metaInformation, mobileInfo, websiteInfo, phoneIds } =
    payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileComparisonModel = new MobileComparisonModel({
      title,
      phones,
      mobileInfo,
      websiteInfo,
      metaInformation,
      phoneIds,
    });

    // check Already have an comparison
    const isExistingMobileComparison = await MobileComparisonModel.find({
      "mobileInfo.phoneId": mobileInfo.phoneId,
    });
    if (isExistingMobileComparison?.length > 0) {
      return {
        isSuccess: false,
        message: "Already have an comparison for the same mobile keyword!",
      };
    }
    // Attempt to save the new blog post to the database
    const res = await mobileComparisonModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile comparison create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile comparison
const getMobileComparisonService = async (
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

    const res = await MobileComparisonModel.aggregate([
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
  createMobileComparisonService,
  getMobileComparisonService,
};
