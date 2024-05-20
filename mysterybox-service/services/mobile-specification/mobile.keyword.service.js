const {
  MobileProfileKeywordModel,
  MobileBlogKeywordModel,
} = require("../../models/mobile-specification/mobile.keyword.model");

// create mobile specification profile keyword
const createMobileProfileKeywordService = async (payload) => {
  let { keywords, profile, vendor, types, features } = payload;
  try {
    const mobileKeywordModel = new MobileProfileKeywordModel({
      keywords,
      profile,
      vendor,
      types,
      features,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileKeywordModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile profile keyword created successfull",
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
const getMobileProfileKeywordService = async (
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
        { "keywords.mainKeyword": { $regex: searchText, $options: "i" } },
        { "keywords.relevantKeyword": { $regex: searchText, $options: "i" } },
      ];
    }
    // Apply filters if they are provided
    if (filters) {
      if (filters.phoneId) {
        query["keywords.mainKeyword"] = filters.phoneId;
      }
      if (filters.status) {
        query.status = filters.status;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileProfileKeywordModel.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $addFields: {
                _idString: { $toString: "$_id" }, // for object id
              },
            },
            // count total faq
            {
              $lookup: {
                from: "mobile-faqs", // Collection name
                localField: "_idString", // _id
                foreignField: "mobileInfo.phoneId",
                as: "faqData",
              },
            },
            // count total mobile specification
            {
              $lookup: {
                from: "mobile-specifications",
                localField: "_idString",
                foreignField: "mobileInfo.phoneId",
                as: "specificationData",
              },
            },

            // count total user reviews
            {
              $lookup: {
                from: "user-reviews",
                localField: "_idString",
                foreignField: "mobileInfo.phoneId",
                as: "userReviewData",
              },
            },
            // Adds the faqCount, Etc field, which counts the number of related FAQs, Specification and others.
            {
              $addFields: {
                faqCount: { $size: "$faqData" },
                specificationCount: { $size: "$specificationData" },
                userReviewCount: { $size: "$userReviewData" },
              },
            },
            // Removes the Data field from the result.
            {
              $project: {
                _idString: 0,
                faqData: 0,
                specificationData: 0,
                userReviewData: 0,
              },
            },
          ],
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

// create mobile blog keyword
const createMobileBlogKeywordService = async (payload) => {
  let { mainKeyword, relevantKeyword, relevantUrl, types, features } = payload;
  try {
    const mobileKeywordModel = new MobileBlogKeywordModel({
      mainKeyword,
      relevantKeyword,
      relevantUrl,
      types,
      features,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileKeywordModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile blog keyword created successfull",
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
const getMobileBlogKeywordService = async (
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
      //TODO: Filter logic here
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileBlogKeywordModel.aggregate([
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
  createMobileProfileKeywordService,
  createMobileBlogKeywordService,
  getMobileProfileKeywordService,
  getMobileBlogKeywordService,
};
