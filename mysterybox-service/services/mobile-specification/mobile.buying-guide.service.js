const MobileBuyingGuideModel = require("../../models/mobile-specification/mobile.buying-guide.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");
// generate mobile buying guide content using  open ai
const generateMobileBuyingGuideService = async (payload) => {
  const generatedContent = await generateMobileSpecification(payload);
  try {
    if (generatedContent) {
      return {
        isSuccess: true,
        response: generatedContent,
        message: "Content generated successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// create mobile buying guide after generate mobile buying guide content using open ai
const createMobileBuyingGuideService = async (payload) => {
  let { title, description, mobileInfo, websiteInfo } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileBuyingGuideModel = new MobileBuyingGuideModel({
      title,
      description,
      mobileInfo,
      websiteInfo,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileBuyingGuideModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile buying guide create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile buying guide
const getMobileBuyingGuideService = async (
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

    const res = await MobileBuyingGuideModel.aggregate([
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
  generateMobileBuyingGuideService,
  createMobileBuyingGuideService,
  getMobileBuyingGuideService,
};
