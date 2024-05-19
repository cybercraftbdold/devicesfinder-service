const MobileFaqModel = require("../../models/mobile-specification/mobile.faq.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");

// generate mobile specification content using  open ai
const generateMobileFaqService = async (payload) => {
  // let { title, status, specification, metaInformation } = payload;
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
// create mobile specification after generate mobile specification content using open ai
const createMobileFaqService = async (payload) => {
  let { title, faqList, mobileInfo } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileFaqModel = new MobileFaqModel({
      title,
      faqList,
      mobileInfo,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileFaqModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile specification create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// get mobile specification
const getMobileFaqService = async (
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
        { specification: { $regex: searchText, $options: "i" } },
      ];
    }
    // apply filters if they are provided
    if (filters) {
      // Check phoneId
      if (filters.phoneId) {
        query["phone.phoneId"] = filters.phoneId;
      }
      if (filters.status) {
        query.status = filters.status;
        // query.status = { $regex: new RegExp(filters.status, "i") };
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileFaqModel.aggregate([
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
  generateMobileFaqService,
  createMobileFaqService,
  getMobileFaqService,
};
