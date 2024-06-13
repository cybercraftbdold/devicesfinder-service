const determineSearchType = require("../../helpers/determineSearchType");
const {
  createSpecificationService,
  getSpecificationService,
  getSingleSpecificationService,
  getTopPopularSpecificationsService,
} = require("../../services/specification/specification.service");

// create mobile specification
const createSpecificationController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createSpecificationService(payload);

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
    next(error);
  }
};

//get all mobile specification
const getSpecificationController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const status = req?.query?.status;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};

    if (status) {
      filters.status = status;
    }
    const result = await getSpecificationService(
      limit,
      skip,
      searchText,
      filters,
      sortField,
      sortOrder
    );

    console.log(result);
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

// get single specification by canonical url or id or title
const getSingleSpecificationController = async (req, res) => {
  const identifier = req.params.identifier;
  const searchBy = determineSearchType(identifier);
  try {
    const result = await getSingleSpecificationService(identifier, searchBy);
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
const getTopPopularSpecificationsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const result = await getTopPopularSpecificationsService(limit);
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

module.exports = {
  createSpecificationController,
  getSpecificationController,
  getSingleSpecificationController,
  getTopPopularSpecificationsController,
};
