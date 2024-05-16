const {
  createMobileBlogKeywordService,
} = require("../../services/mobile-specification/mobile.keyword.service");
const {
  createMobileSpecificationService,
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

module.exports = {
  createMobileSpecificationController,
  createMobileBlogKeywordController,
};