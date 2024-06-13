const { createConsService } = require("../../services/cons/cons.service");

// Create FAQ
const createConsController = async (req, res) => {
  try {
    const payload = req.body;

    const result = await createConsService(payload);

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
  createConsController,
};
