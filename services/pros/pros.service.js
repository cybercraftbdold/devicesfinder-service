const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const ProsModel = require("../../models/pros-model/pros.model");

// Create Device Review
const createProsService = async (payload) => {
  let { title, deviceId, reviewStatus, description, metaInformation } = payload;

  try {
    const duplicatePros = await ProsModel.findOne({
      deviceId,
    });

    // duplicate pros are updating
    if (duplicatePros)
      return await updateWithDeviceIdService(payload, ProsModel, "Pros");

    // Proceed to create a new ProsModel instance with the provided payload
    const pros = new ProsModel({
      title,
      deviceId,
      reviewStatus,
      description,
      metaInformation,
    });

    // Attempt to save the new pros to the database
    const newPros = await pros.save();

    if (newPros) {
      return {
        isSuccess: true,
        response: newPros,
        message: "Device Pros published successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get All Pros
const getAllProsService = async (
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

    const res = await ProsModel.aggregate([
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
  createProsService,
  getAllProsService,
};
