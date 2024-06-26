const { ObjectId } = require("mongodb");
const MobileSpecificationModel = require("../../models/specification-model/specification.model");
const {
  combainMobileSpecificationLookup,
} = require("../../db-query/lookup/combain-specification-lookup");
const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const {
  generateUniqueIdentifier,
} = require("../../helpers/generateUniqueCanonicalUrl");

// create mobile specification
const createSpecificationService = async (payload) => {
  let {
    title,
    deviceId,
    deviceType,
    deviceSubType,
    reviewStatus,
    specification,
    cons,
    pros,
    images,
    brandInfo,
    metaInformation,
  } = payload;

  try {
    // Generate a unique canonical URL for the specification post
    const uniqueCanonicalUrl = await generateUniqueIdentifier(
      MobileSpecificationModel,
      metaInformation.canonicalUrl,
      "metaInformation.canonicalUrl"
    );
    // Update metaInformation with the unique canonical URL
    metaInformation.canonicalUrl = uniqueCanonicalUrl;

    const duplicateSpecification = await MobileSpecificationModel.findOne({
      deviceId,
    });

    // update specification if there is duplicate specification
    if (duplicateSpecification) {
      return await updateWithDeviceIdService(
        payload,
        MobileSpecificationModel,
        "Specification"
      );
    }

    // Proceed to create a new SpecificationModel instance with the provided payload
    const specificationInstance = new MobileSpecificationModel({
      title,
      deviceId,
      deviceType,
      deviceSubType,
      reviewStatus,
      specification,
      cons,
      pros,
      images,
      brandInfo,
      metaInformation,
    });

    // Attempt to save the new specification post to the database
    const newSpecification = await specificationInstance.save();

    if (newSpecification) {
      return {
        isSuccess: true,
        response: newSpecification,
        message: "Specification published successfully",
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
const getSpecificationService = async (
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
      query.$or = [{ title: { $regex: searchText, $options: "i" } }];
    }
    // Apply filters if they are provided
    if (filters) {
      if (filters.status) {
        query.status = filters.status;
      }
      if (filters.brand) {
        query["brandInfo.manufactureName"] = filters.brand;
      }
      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
      }
      if (filters.deviceType) {
        query.deviceType = filters.deviceType;
      }
      if (filters.deviceSubType) {
        query.deviceSubType = filters.deviceSubType;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileSpecificationModel.aggregate([
      { $match: query },
      { $sort: sort },
      ...combainMobileSpecificationLookup(),
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
        response: res[0], // Extract first element of the result which contains the facet structure
        message: "Data getting successful",
      };
    } else {
      return {
        isSuccess: true,
        response: [],
        message: "No data found",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// const getSpecificationService = async (
//   limit,
//   skip,
//   searchText,
//   filters,
//   sortField = "createdAt",
//   sortOrder = "desc"
// ) => {
//   try {
//     let query = {};
//     if (searchText) {
//       query.$or = [{ title: { $regex: searchText, $options: "i" } }];
//     }
//     // Apply filters if they are provided
//     if (filters) {
//       if (filters.status) {
//         query.status = filters.status;
//       }
//     }

//     // Determine sort order
//     const sort = {};
//     sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

//     const res = await MobileSpecificationModel.aggregate([
//       { $match: query },
//       { $sort: sort },
//       {
//         $addFields: {
//           specificationIdStr: { $toString: "$_id" }, // Convert ObjectId _id to string
//         },
//       },
//       {
//         $lookup: {
//           from: "user-reviews",
//           localField: "specificationIdStr",
//           foreignField: "specificationId",
//           as: "reviews",
//         },
//       },
//       {
//         $addFields: {
//           averageRating: { $avg: "$reviews.rating" },
//         },
//       },
//       {
//         $project: {
//           reviews: 0,
//           specificationIdStr: 0,
//         },
//       },
//       {
//         $facet: {
//           data: [{ $skip: skip }, { $limit: limit }],
//           totalCount: [{ $count: "value" }],
//         },
//       },
//     ]);

//     if (res) {
//       return {
//         isSuccess: true,
//         response: res,
//         message: "Data getting successful",
//       };
//     }
//   } catch (error) {
//     return {
//       isSuccess: false,
//       message: error.message,
//     };
//   }
// };

// get mobile specification
const getSingleSpecificationService = async (identifier, searchBy) => {
  try {
    let pipeline = [];
    if (searchBy === "id") {
      pipeline.push({
        $match: { _id: new ObjectId(identifier) },
      });
    } else if (searchBy === "title") {
      pipeline.push({
        $match: { title: identifier },
      });
    } else if (searchBy === "canonicalUrl") {
      pipeline.push({
        $match: { "metaInformation.canonicalUrl": identifier },
      });
    } else {
      return {
        isSuccess: false,
        message: "Invalid search criteria provided.",
      };
    }

    // Append lookup and related aggregation stages before limiting the results
    pipeline = pipeline.concat(combainMobileSpecificationLookup());

    pipeline.push({
      $limit: 1,
    });

    const res = await MobileSpecificationModel.aggregate(pipeline);
    if (res.length > 0) {
      const specification = res[0];

      // Increment viewCount, this is done separately as it should not affect the output from the aggregate
      await MobileSpecificationModel.updateOne(
        { _id: specification._id },
        { $inc: { viewCount: 1 } }
      );

      // No need to fetch again since aggregate should return the necessary data
      return {
        isSuccess: true,
        response: specification,
        message: "Data fetching successful",
      };
    } else {
      return {
        isSuccess: false,
        message: "No document found matching the provided criteria.",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// get speicification by device id
const getSingleSpecificationByDeviceIdService = async (deviceId) => {
  try {
    const specificationByDeviceId = await MobileSpecificationModel.findOne({
      deviceId,
    });

    if (!specificationByDeviceId)
      return {
        isSuccess: false,
        message: "No specification found with the given device id!",
      };

    return {
      isSuccess: true,
      message: "Data getting successfully",
      response: specificationByDeviceId,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// get top populer specification
const getTopPopularSpecificationsService = async (limit) => {
  try {
    // Define the pipeline for aggregation
    const pipeline = [
      { $sort: { viewCount: -1 } }, // Sort by viewCount in descending order
      { $limit: limit }, // Limit the results to the specified number
    ];

    // Execute the aggregation pipeline
    const topSpecifications = await MobileSpecificationModel.aggregate(
      pipeline
    );

    return {
      isSuccess: true,
      response: topSpecifications,
      message: "Top popular specifications fetched successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};


// generate device types and sub types
const getUsedUniqueTypsService = async () => {
  try {
    // Fetch unique used device types and subtypes from the database
    let usedDeviceTypes = await MobileSpecificationModel.distinct("deviceType");
    let usedDeviceSubTypes = await MobileSpecificationModel.aggregate([
      {
        $group: {
          _id: "$deviceType",
          subTypes: { $addToSet: "$deviceSubType" },
        },
      },
    ]);

    // Map the device types and subtypes to the desired format
    let types = usedDeviceTypes.map((type) => {
      // Find subtypes for the current device type
      let subTypes =
        usedDeviceSubTypes.find((item) => item._id === type)?.subTypes || [];
      return {
        deviceType: {
          name: type,
          slug: `/${type.toLowerCase().replace(/\s+/g, "-")}`,
        },
        deviceSubType: subTypes.map((subType) => ({
          name: subType,
          slug: `/${type.toLowerCase().replace(/\s+/g, "-")}/${subType
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
        })),
      };
    });

    return {
      isSuccess: true,
      response: types,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  createSpecificationService,
  getSpecificationService,
  getSingleSpecificationService,
  getTopPopularSpecificationsService,
  getSingleSpecificationByDeviceIdService,
  getUsedUniqueTypsService,
};
