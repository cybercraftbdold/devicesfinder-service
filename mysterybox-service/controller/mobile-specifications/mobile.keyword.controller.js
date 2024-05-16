const {
  createMobileProfileKeywordService,
} = require("../../services/mobile-specification/mobile.keyword.service");

// create mobile profile keyword controller
const createMobileProfileKeywordController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileProfileKeywordService(payload);
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

module.exports = {
  createMobileProfileKeywordController,
};
