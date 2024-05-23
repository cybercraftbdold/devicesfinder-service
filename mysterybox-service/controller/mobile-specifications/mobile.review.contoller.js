const {
  generateMobileReviewService,
  createMobileReviewService,
  getMobileReviewService,
} = require("../../services/mobile-specification/mobile.review.service");

// create mobile review controller
const createMobileReviewController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileReviewService(payload);
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
// generate content for mobile review using open ai
const generateMobileReviewController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await generateMobileReviewService(payload);
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
//get all mobile review
const getMobileReviewController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const phoneId = req?.query?.phoneId;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};
    // check type of filters
    if (phoneId) {
      filters.phoneId = phoneId;
    }
    const result = await getMobileReviewService(
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
  createMobileReviewController,
  generateMobileReviewController,
  getMobileReviewController,
};
