const {
  generateMobileUserReviewService,
  createMobileUserReviewService,
  getMobileUserReviewService,
  deleteMobileUserReviewService,
} = require("../../services/mobile-specification/mobile.user-review.service");

// create mobile user review controller
const createMobileUserReviewController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileUserReviewService(payload);
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
// generate content for mobile user review using open ai
const generateMobilUserReviewController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await generateMobileUserReviewService(payload);
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
//get all mobile user review
const getMobileUserReviewController = async (req, res) => {
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
    // if (status) {
    //   filters.status = status;
    // }
    const result = await getMobileUserReviewService(
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
// delete mobile specifications
const deleteMobileUserReviewController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteMobileUserReviewService(id);
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
  createMobileUserReviewController,
  generateMobilUserReviewController,
  getMobileUserReviewController,
  deleteMobileUserReviewController,
};
