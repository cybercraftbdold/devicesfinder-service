const MobileBlogModel = require("../../models/mobile-specification/moble.blog.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");

// generate mobile blog  using  open ai
const generateMobileBlogService = async (payload) => {
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
// create mobile blog after generate mobile blog content using open ai
const createMobileBlogService = async (payload) => {
  let { title, description, metaInformation, mobileInfo, websiteInfo } =
    payload;
    console.log(payload)
  try {
    const mobileBlogModel = new MobileBlogModel({
      title,
      description,
      mobileInfo,
      websiteInfo,
      metaInformation,
    });

    // check Already have an blog
    const isExistingMobileBlog = await MobileBlogModel.find({
      "mobileInfo.phoneId": mobileInfo.phoneId,
    });
    if (isExistingMobileBlog?.length > 0) {
      return {
        isSuccess: false,
        message: "Already have an blog for the same mobile keyword!",
      };
    }
    // Attempt to save the new blog post to the database
    const res = await mobileBlogModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile blog create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile blog
const getMobileBlogService = async (
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

    const res = await MobileBlogModel.aggregate([
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
  generateMobileBlogService,
  createMobileBlogService,
  getMobileBlogService,
};
