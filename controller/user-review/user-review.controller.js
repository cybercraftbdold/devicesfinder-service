const {
  getUserReviewsService,
  getSingleUserReviewService,
  createUserReviewService,
  updateUserReviewService,
  deleteUserReviewService,
} = require("../../services/user-review/user-review.service");

// get all review controller
const getUserReviewsController = async (req, res) => {
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
    // check type of filters
    if (deviceId) {
      filters.deviceId = deviceId;
    }
    const result = await getUserReviewsService(
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

// get single user review controller
const getSingleUserReviewController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getSingleUserReviewService(id);

    if (!result?.isSuccess)
      res.status(404).json({
        message: result?.message,
        isSuccess: result.isSuccess,
      });

    return res.status(200).json({
      message: result?.message,
      isSuccess: result.isSuccess,
      data: result?.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// create  user review controller
const createUserReviewController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createUserReviewService(payload);
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

// update user review controller
const updateUserReviewController = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const result = await updateUserReviewService(id, payload);

    if (!result?.isSuccess)
      res.status(404).json({
        message: result?.message,
        isSuccess: false,
        response: result?.response,
      });

    return res.status(200).json({
      message: result?.message,
      isSuccess: result?.isSuccess,
      response: result?.response,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      isSuccess: false,
    });
  }
};

// delete user reivew
const deleteUserReviewController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteUserReviewService(id);
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
  getUserReviewsController,
  getSingleUserReviewController,
  createUserReviewController,
  updateUserReviewController,
  deleteUserReviewController,
};
