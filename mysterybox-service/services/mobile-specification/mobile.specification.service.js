const {
  combainMobileContentLookup,
} = require("../../db-query/mobile-specification/lookup/combain-mobile-content-lookup");
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
// combain data for generate mobile specification
const combainMobileSpecificationContent = async (id) => {
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
      // combain all content with mobile specification
      ...combainMobileContentLookup(),
    ]);

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
const updateMobileStatusService = async (id, status) => {
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
      { $set: { status: status } }
    );
    if (res.modifiedCount > 0) {
      const data = await MobileSpecificationContentModel.findOne({
        _id: id,
      });
      if (data?.status?.toLocaleLowerCase() === "active") {
        const combainContentResponse = await combainMobileSpecificationContent(
          id
        );
        if (combainContentResponse?.isSuccess) {
          return {
            isSuccess: true,
            response: combainContentResponse?.data,
            message:
              "Updated successfull and Succcessfully published mobile spacification",
          };
        } else {
          await MobileSpecificationContentModel.updateOne(
            { _id: id },
            { $set: { status: "draft" } }
          );
          return {
            isSuccess: true,
            response: res,
            message: "updated not working! Combain content generate failed",
          };
        }
      } else {
        return {
          isSuccess: true,
          response: res,
          message: "Status updated successfull",
        };
      }
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
