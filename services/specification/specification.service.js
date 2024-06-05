const { ObjectId } = require("mongodb");
const MobileSpecificationModel = require("../../models/specification-model/specification.model");
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
    // apply filters if they are provided
    if (filters) {
      if (filters.status) {
        query.status = filters.status;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await MobileSpecificationModel.aggregate([
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

    pipeline.push({
      $limit: 1,
    });

    const res = await MobileSpecificationModel.aggregate(pipeline);
    if (res.length > 0) {
      const specification = res[0];

      // Increment viewCount
      await MobileSpecificationModel.updateOne(
        { _id: specification._id },
        { $inc: { viewCount: 1 } }
      );

      // Return the updated document
      const updatedSpecification = await MobileSpecificationModel.findById(
        specification._id
      );

      return {
        isSuccess: true,
        response: updatedSpecification,
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

module.exports = { getSpecificationService, getSingleSpecificationService };
