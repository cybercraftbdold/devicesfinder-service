const { ObjectId } = require("mongodb");
const ComparisonModel = require("../../models/specification-model/comparison.model");
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
const getTopPopularComparisonService = async (limit) => {
  try {
    // Define the pipeline for aggregation
    const pipeline = [
      { $sort: { viewCount: -1 } }, // Sort by viewCount in descending order
      { $limit: limit }, // Limit the results to the specified number
    ];

    // Execute the aggregation pipeline
    const topComparisons = await ComparisonModel.aggregate(pipeline);

    return {
      isSuccess: true,
      response: topComparisons,
      message: "Top popular comparison fetched successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  getComparisonService,
  getSingleComparisonService,
  getTopPopularComparisonService,
};
