const {
  createMobileGptPromptService,
  updateMobileGptPromptService,
  getMobileGptPromptService,
} = require("../../../services/ai-integration/mobile-specification/prompt.mobile.specification");

// create mobile specification controller
const createMobileGptPromptController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileGptPromptService(payload);
    // Prepare response based on the result from the service
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

// update mobile specification prompt
const updateMobileGptPromptController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateMobileGptPromptService(id, data);
    // Prepare response based on the result from the service
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

// get mobile specification prompt
const getMobileGptPromptController = async (req, res, next) => {
  try {
    const result = await getMobileGptPromptService();
    // Prepare response based on the result from the service
    if (result.isSuccess) {
      res.json({
        message: result?.message,
        data: result?.response,
        isSuccess: result?.isSuccess,
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
  createMobileGptPromptController,
  updateMobileGptPromptController,
  getMobileGptPromptController,
};
