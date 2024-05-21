const {
  allowUserReviewsProperty,
  allowFaqProperty,
  allowBuyingGuideProperty,
} = require("../../db-query/mobile-specification/allow-property/allow-specification-property");
const MobileSpecificationContentModel = require("../../models/mobile-specification/mobile.specification.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");

// generate mobile specification content using  open ai
const generateMobileSpecificationService = async (payload) => {
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
const createMobileSpecificationService = async (payload) => {
  let { title, status, specification, metaInformation, mobileInfo } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileSpecificationContentModel = new MobileSpecificationContentModel(
      {
        title,
        status,
        mobileInfo,
        specification,
        metaInformation,
      }
    );

    // Attempt to save the new blog post to the database
    const res = await mobileSpecificationContentModel.save();
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
const getMobileSpecificationService = async (
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
        query["mobileInfo.phoneId"] = filters.phoneId;
      }
      if (filters.status) {
        query.status = filters.status;
        // query.status = { $regex: new RegExp(filters.status, "i") };
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileSpecificationContentModel.aggregate([
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
// create main content when update mobile specification status
const createMobileSpecificationContent = async (id) => {
  console.log("working");

  try {
    const initialData = await MobileSpecificationContentModel.findOne({
      _id: id,
    });
    if (!initialData) {
      return {
        isSuccess: false,
        message: "No data found for the provided ID.",
      };
    }

    // Assuming initialData.mobileInfo.phoneId exists and is the right ID to match against
    const phoneId = initialData.mobileInfo.phoneId;

    const res = await MobileSpecificationContentModel.aggregate([
      {
        $match: {
          "mobileInfo.phoneId": phoneId,
        },
      },
      // relation mobile buying guides
      {
        $lookup: {
          from: "mobile-buying-guides",
          localField: "mobileInfo.phoneId",
          foreignField: "mobileInfo.phoneId",
          as: "buyingGuide",
        },
      },
      // relation mobile faq
      {
        $lookup: {
          from: "mobile-faqs",
          localField: "mobileInfo.phoneId",
          foreignField: "mobileInfo.phoneId",
          as: "faqs",
        },
      },
      // relation to user reviews
      {
        $lookup: {
          from: "user-reviews",
          localField: "mobileInfo.phoneId",
          foreignField: "mobileInfo.phoneId",
          as: "userReviews",
        },
      },
      // relation to mobile specification
      {
        $lookup: {
          from: "user-reviews",
          localField: "mobileInfo.phoneId",
          foreignField: "mobileInfo.phoneId",
          as: "userReviews",
        },
      },

      {
        $project: {
          // _id: 1, // 1 = add 0 = remove
          title: 1,
          specification: 1,
          metaInformation: 1,
          mobileInfo: 1,
          faqs: {
            $map: allowFaqProperty,
          },
          buyingGuide: {
            $map: allowBuyingGuideProperty,
          },
          // userReviews: 1, //get all user reviews
          userReviews: {
            $map: allowUserReviewsProperty,
          },
        },
      },
    ]);

    console.log("Aggregation result:", JSON.stringify(res, null, 2));
    return { isSuccess: true, data: res };
  } catch (error) {
    console.error("Error in aggregation:", error);
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// update status specification
const updateMobileStatusService = async (id, data) => {
  await createMobileSpecificationContent(id);
  try {
    const isExisting = await MobileSpecificationContentModel.findOne({
      _id: id,
    });
    if (!isExisting) {
      return {
        isSuccess: false,
        message: "Data not found!",
      };
    }
    const res = await MobileSpecificationContentModel.updateOne(
      { _id: id },
      { $set: data }
    );

    if (res.modifiedCount > 0) {
      return {
        isSuccess: true,
        response: res,
        message: "Specification updated successfull",
      };
    } else {
      return {
        isSuccess: false,
        message: "Something wrong please try again",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  createMobileSpecificationService,
  generateMobileSpecificationService,
  getMobileSpecificationService,
  updateMobileStatusService,
};
