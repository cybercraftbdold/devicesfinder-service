const {
  getCountOfCollectionsService,
} = require("../../services/collection-statistics/collection-statistics.service");

// get count of collections controller
const getCountOfCollectionsController = async (req, res) => {
  try {
    const reviewStatus = req.query.reviewStatus;

    const response = await getCountOfCollectionsService(reviewStatus);

    return res.status(200).json({
      isSuccess: response?.isSuccess,
      message: response?.message,
      data: response?.data,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCountOfCollectionsController,
};
