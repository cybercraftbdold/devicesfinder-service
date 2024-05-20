const {
  getKeywordCountService,
} = require("../../services/description-statistics/mobile-keyword-statistic.service");

const getKeywordCountController = async (req, res) => {
  try {
    const phoneId = req?.query?.phoneId;
    const filters = {};
    // check type of filters
    if (phoneId) {
      filters.phoneId = phoneId;
    }
    const result = await getKeywordCountService(filters);
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        counts: result?.counts,
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
  getKeywordCountController,
};
