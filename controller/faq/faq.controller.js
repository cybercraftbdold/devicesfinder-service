const { createFaqService } = require("../../services/faq/faq.service");

// Create FAQ
const createFaqController = async (req, res) => {
  try {
    const payload = req.body;

    const result = await createFaqService(payload);

    if (result.isSuccess) {
      res.status(201).json({
        message: result.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(400).json({
        message: result.message,
        isSuccess: false,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: result.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createFaqController,
};
