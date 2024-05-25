const WebsiteModelModel = require("../../models/manage-mystery-box/manage.website.model");

// create mobile specification profile keyword
const addWebsiteService = async (payload) => {
  let { websiteName, websiteUrl, status } = payload;
  try {
    const websiteModelModel = new WebsiteModelModel({
      websiteName,
      websiteUrl,
      status,
    });

    // Check if the website already exists
    const existingSite = await WebsiteModelModel.findOne({
      $or: [{ websiteName }, { websiteUrl }],
    });

    if (existingSite) {
      return {
        isSuccess: false,
        message:
          "Website name or URL already in use. Please use different credentials.",
      };
    }

    // Attempt to save the new blog post to the database
    const res = await websiteModelModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Website added successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile specification profile keyword
const getWebsitesService = async (
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
        { websiteName: { $regex: searchText, $options: "i" } },
        { websiteUrl: { $regex: searchText, $options: "i" } },
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

    const res = await WebsiteModelModel.aggregate([
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
  addWebsiteService,
  getWebsitesService,
};
