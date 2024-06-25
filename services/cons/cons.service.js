const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const ConsModel = require("../../models/cons-model/cons.model");

// Create Device Review
const createConsService = async (payload) => {
  let { title, deviceId, description } = payload;

  try {
    const duplicateCons = await ConsModel.findOne({
      deviceId,
    });

    // Checking for duplicate brand
    if (duplicateCons)
      return await updateWithDeviceIdService(payload, ConsModel, "Cons");

    // Proceed to create a new ConsModel instance with the provided payload
    const cons = new ConsModel({
      title,
      deviceId,
      description,
    });

    // Attempt to save the new Cons to the database
    const newCons = await cons.save();

    if (newCons) {
      return {
        isSuccess: true,
        response: newCons,
        message: "Device Cons published successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get All Cons
const getAllConsService = async (
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
      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await ConsModel.aggregate([
      { $match: query },
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
        response: res[0],
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

module.exports = {
  createConsService,
  getAllConsService,
};
