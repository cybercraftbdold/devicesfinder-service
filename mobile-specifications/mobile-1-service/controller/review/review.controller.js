const {
  createMobileReview,
  getAllReviewService,
} = require("../../services/reivew/review.service");
const {
  getSpecificationData,
} = require("../../utils/messageConsumer/mobileSpecificationDataConsumer");

// create review controller
const createReviewController = async (req, res, next) => {
  try {
    const result = await createMobileReview(req.body);
    // Prepare response based on the result from the service
    res.json({
      message: result.message,
      status_code: result.isSuccess ? 200 : 400,
      reivew: result.reivew,
    });
  } catch (error) {
    next(error);
  }
};

// get all review controller
const getAllReviewController = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchText = req.query.searchText || "";
  const role = req.query.role || "";
  try {
    const result = await getAllReviewService(limit, skip, searchText, {
      role,
    });

    const resRabbit = getSpecificationData();
    if (result.isSuccess) {
      res.status(200).json({
        message: "Users fetched successfully",
        data: result.users,
        resRabbit: resRabbit,
        totalUsers: result.totalUsers,
        page,
        limit,
      });
    } else {
      res.status(404).json({
        message: result.message || "No users found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createReviewController, getAllReviewController };
