const {
  createDeviceReviewService,
  getDeviceReviewService,
  deleteDeviceReviewService,
} = require("../../services/device-review/device-review.service");

// Create Device Review
const createDeviceReviewController = async (req, res) => {
  try {
    const payload = req.body;

    const result = await createDeviceReviewService(payload);

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

// Get Device Review
const getDeviceReviewController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const deviceId = req?.query?.deviceId;
    const hasSpecification = req?.query?.hasSpecification;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};

    if (deviceId) {
      filters.deviceId = deviceId;
    }
    if (hasSpecification) {
      filters.hasSpecification = hasSpecification;
    }

    const result = await getDeviceReviewService(
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
        totalItems: result?.response?.totalCount[0]?.value || 0,
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

// Delete Device Review
const deleteDeviceReviewController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteDeviceReviewService(id);

    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    } else {
      res.status(404).json({
        message: result?.message,
        isSuccess: false,
        response: result?.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createDeviceReviewController,
  getDeviceReviewController,
  deleteDeviceReviewController,
};
