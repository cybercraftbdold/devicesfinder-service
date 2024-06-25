const {
  createConsService,
  getAllConsService,
} = require("../../services/cons/cons.service");

// Create FAQ
const createConsController = async (req, res) => {
  try {
    const payload = req.body;

    const result = await createConsService(payload);

    if (result.isSuccess) {
      res.status(201).json({
        message: result.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(400).json({
        message: result.message,
        isSuccess: false,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: result.message,
      isSuccess: false,
    });
  }
};

// Get All Cons
const getAllConsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const deviceId = req?.query?.deviceId;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";

    // filters
    const filters = {};

    if (deviceId) {
      filters.deviceId = deviceId;
    }

    const result = await getAllConsService(
      limit,
      skip,
      searchText,
      filters,
      sortField,
      sortOrder
    );

    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        totalItems: result?.response?.totalCount?.value || 0,
        totalLength: result?.response.data?.length,
        data: result?.response.data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createConsController,
  getAllConsController,
};
