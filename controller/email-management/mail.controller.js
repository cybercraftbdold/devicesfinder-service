const {
  sendContactMailService,
} = require("../../services/email-management/mail.service");

const sendContactMailController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await sendContactMailService(payload);
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

module.exports = {
  sendContactMailController,
};
