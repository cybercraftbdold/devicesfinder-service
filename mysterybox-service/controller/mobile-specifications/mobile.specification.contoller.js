const {
  createMobileBlogKeywordService,
} = require("../../services/mobile-specification/mobile.keyword.service");
const {
  createMobileSpecificationService,
  generateMobileSpecificationService,
  getMobileSpecificationService,
} = require("../../services/mobile-specification/mobile.specification.service");
// create mobile specification controller
const createMobileSpecificationController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileSpecificationService(payload);
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
// create mobile blog keyword controller controller
const createMobileBlogKeywordController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileBlogKeywordService(payload);
    if (result.isSuccess) {
      res.json({
        message: result.message,
        isSuccess: result.isSuccess,
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
// generate content for mobile specification using open ai
const generateMobileSpecificationController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await generateMobileSpecificationService(payload);
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
//get all mobile specification
const getMobileSpecificationController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const phoneId = req?.query?.phoneId;
    const status = req?.query?.status;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};
    // check type of filters
    if (phoneId) {
      filters.phoneId = phoneId;
    }
    if (status) {
      filters.status = status;
    }
    const result = await getMobileSpecificationService(
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

module.exports = {
  createMobileSpecificationController,
  createMobileBlogKeywordController,
  generateMobileSpecificationController,
  getMobileSpecificationController,
};
