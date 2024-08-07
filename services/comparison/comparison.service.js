const { ObjectId } = require("mongodb");
const ComparisonModel = require("../../models/comparison-model/comparison.model");
const compareSpecs = require("../../helpers/compare/compareSpecs");
const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const {
  generateUniqueIdentifier,
} = require("../../helpers/generateUniqueCanonicalUrl");
const deleteItem = require("../../helpers/service-helpers/deleteItem");

// create mobile comparison service
const createComparisonService = async (payload, isUpdate, comparisonId) => {
  let { title, reviewStatus, ratings, phones, metaInformation, deviceId } =
    payload;
  try {
    const uniqueCanonicalUrl = await generateUniqueIdentifier(
      ComparisonModel,
      metaInformation.canonicalUrl,
      "metaInformation.canonicalUrl"
    );
    // Update metaInformation with the unique canonical URL
    metaInformation.canonicalUrl = uniqueCanonicalUrl;

    const duplicateComparison = await ComparisonModel.findOne({
      _id: new ObjectId(comparisonId),
    });

    // If comparison exists update that
    if (duplicateComparison && isUpdate) {
      const { deviceId, ...updatePayload } = payload;

      const updatedData = await ComparisonModel.findOneAndUpdate(
        { _id: new ObjectId(comparisonId) },
        { $set: updatePayload },
        { new: true }
      );

      if (!updatedData) {
        return {
          isSuccess: false,
          message: `${serviceName} update failed!`,
        };
      }

      return {
        isSuccess: true,
        response: updatedData,
        message: `Comparison Updated Successfully`,
      };
    }
    const comparisonModel = new ComparisonModel({
      title,
      reviewStatus,
      ratings,
      phones,
      deviceId,
      metaInformation,
    });

    const res = await comparisonModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile comparison published successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// get comparison
const getComparisonService = async (
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
    // apply filters if they are provided
    if (filters) {
      if (filters.status) {
        query.status = filters.status;
      }

      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await ComparisonModel.aggregate([
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
// // get mobile specification
const getSingleComparisonService = async (identifier, searchBy) => {
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

    pipeline.push({
      $limit: 1,
    });

    const res = await ComparisonModel.aggregate(pipeline);
    if (res.length > 0) {
      const comparison = res[0];
      // Increment viewCount
      await ComparisonModel.updateOne(
        { _id: comparison._id },
        { $inc: { viewCount: 1 } }
      );

      // Return the updated document
      const updatedComparison = await ComparisonModel.findById(comparison._id);
      return {
        isSuccess: true,
        response: updatedComparison,
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

// get top populer comparison
const getTopPopularComparisonService = async (limit, skip) => {
  try {
    // Define the pipeline for aggregation
    const pipeline = [
      { $sort: { viewCount: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          metaInformation: 1,
          phones: {
            $map: {
              input: "$phones",
              as: "phone",
              in: {
                title: "$$phone.title",
                image: "$$phone.image",
                canonicalUrl: "$$phone.canonicalUrl",
                specification: {
                  general: {
                    brand: "$$phone.specification.general.brand",
                  },
                },
              },
            },
          },
        },
      },
    ];
    // Fetch the total count of documents
    const totalCount = await ComparisonModel.countDocuments();
    // Execute the aggregation pipeline
    const topComparisons = await ComparisonModel.aggregate(pipeline);
    const totalCurrentLength = topComparisons.length;
    return {
      isSuccess: true,
      response: topComparisons,
      totalCount: totalCount,
      totalLength: totalCurrentLength,
      message: "Top popular comparison fetched successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// compare mobiles service
const compareMobilesService = async (id) => {
  try {
    // // Fetch the document containing both mobiles
    // const specs = await ComparisonModel.findById(id);
    // if (!specs) {
    //   return {
    //     isSuccess: false,
    //     message: "Comparison data is incomplete or not found.",
    //   };
    // }
    const specs = {
      title: "iPhone 11 Pro Max",
      deviceId: "665ff4cee210861dacbe5983",
      phones: [
        {
          title: "iPhone 11 Pro Max",
          keyHighlights: {
            releasedDate: "2024-05-29T12:25:02.895Z",
            releasedCountry: "Bangladesh",
            price: "736334",
            weight: "25 g",
            processor: "Snapdragon",
            ram: "8GB",
            rom: "64GB",
            display: "Amoled",
            color: "Silver",
          },
          specification: [],
        },
        {
          title: "iPhone 14 Pro Max",
          keyHighlights: {
            releasedDate: "2024-05-29T12:25:02.895Z",
            releasedCountry: "Bangladesh",
            price: "836334",
            weight: "28 g",
            processor: "Snapdragon",
            ram: "16GB",
            rom: "64GB",
            display: "Super Amoled",
            color: "White",
          },
          specification: [],
        },
      ],
    };

    // Extract phones data
    let phone1 = specs.phones[0];
    let phone2 = specs.phones[1];

    // Calculate the comparisons
    let comparisonResults = {
      ram: compareSpecs(
        phone1.keyHighlights.ram,
        phone2.keyHighlights.ram,
        "RAM"
      ),
      rom: compareSpecs(
        phone1.keyHighlights.rom,
        phone2.keyHighlights.rom,
        "ROM"
      ),
      processor: compareSpecs(
        phone1.keyHighlights.processor,
        phone2.keyHighlights.processor,
        "Processor"
      ),
      display: compareSpecs(
        phone1.keyHighlights.display,
        phone2.keyHighlights.display,
        "Display"
      ),
      price: compareSpecs(
        phone1.keyHighlights.price,
        phone2.keyHighlights.price,
        "Price"
      ),
    };

    // Calculate overall percentage
    let overallPhone1 = 0,
      overallPhone2 = 0;
    let attributesCount = Object.keys(comparisonResults).length;

    for (let key in comparisonResults) {
      overallPhone1 += comparisonResults[key].phone1;
      overallPhone2 += comparisonResults[key].phone2;
    }

    let overallCount = {
      phone1: (overallPhone1 / attributesCount).toFixed(2) + "%",
      phone2: (overallPhone2 / attributesCount).toFixed(2) + "%",
    };
    return {
      isSuccess: true,
      response: { comparisonResults, overallCount },
      message: "Comparison successful",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// delete comparison service
const deleteComparisonService = async (id) => {
  return await deleteItem(id, ComparisonModel);
};

module.exports = {
  getComparisonService,
  getSingleComparisonService,
  getTopPopularComparisonService,
  compareMobilesService,
  createComparisonService,
  deleteComparisonService,
};
