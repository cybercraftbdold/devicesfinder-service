const determineSearchType = require("../../helpers/determineSearchType");
const {
  getComparisonService,
  getSingleComparisonService,
  getTopPopularComparisonService,
  compareMobilesService,
  createComparisonService,
  deleteComparisonService,
} = require("../../services/comparison/comparison.service");

// create  comparison controller
const createComparisonController = async (req, res, next) => {
  try {
    const payload = req.body;
    const isUpdate = req.query?.isUpdate?.toLowerCase() === "true";
    const result = await createComparisonService(payload, isUpdate);
    if (result.isSuccess) {
      res.json({
        message: result.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.json({
        message: result.message,
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

//get all comparison
const getComparisonController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const status = req?.query?.status;
    const deviceId = req?.query?.deviceId;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};

    if (status) {
      filters.status = status;
    }
    if (deviceId) {
      filters.deviceId = deviceId;
    }
    const result = await getComparisonService(
      limit,
      skip,
      searchText,
      filters,
      sortField,
      sortOrder
    );
    if (
      result &&
      result.isSuccess &&
      result.response &&
      result.response.length > 0
    ) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        totalItems: result?.response[0]?.totalCount[0]?.value || 0,
        totalLength: result?.response[0].data?.length,
        data: result?.response[0].data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// get single specification by canonical url or id or title
const getSingleComparisonController = async (req, res) => {
  const identifier = req.params.identifier;
  const searchBy = determineSearchType(identifier);
  try {
    const result = await getSingleComparisonService(identifier, searchBy);
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(404).json({
        message: result.message,
        isSuccess: result.isSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

//get all mobile specification
const getTopPopularComparisonController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const result = await getTopPopularComparisonService(limit);
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(400).json({
        message: result?.message,
        isSuccess: result.isSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

const compareMobilesController = async (req, res) => {
  const comparisonId = req.params.id;
  try {
    const result = await compareMobilesService(comparisonId);
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(404).json({
        message: result.message,
        isSuccess: result.isSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// Delete comparison
const deleteComparisonController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteComparisonService(id);

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
  getComparisonController,
  getSingleComparisonController,
  getTopPopularComparisonController,
  compareMobilesController,
  createComparisonController,
  deleteComparisonController,
};
