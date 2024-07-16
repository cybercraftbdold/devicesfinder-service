const {
  sendContactMailService,
  checkVerifyEmailAddressService,
} = require("../../services/email-management/mail.service");

const sendContactMailController = async (req, res, next) => {
  try {
    console.log(req);
    const payload = req.body;
    const result = await sendContactMailService(payload);

    if (!result?.isSuccess) {
      res.status(500).json({
        message: result?.message,
        isSuccess: false,
      });
    }

    return res.status(201).json({
      message: result?.message,
      isSuccess: result?.isSuccess,
    });
  } catch (error) {
    next(error);
  }
};

const checkVerifyEmailAddressController = async (req, res) => {
  try {
    const { token } = req.query;
    const result = await checkVerifyEmailAddressService(token);

    if (!result?.isSuccess) {
      res.status(500).json({
        message: result?.message,
        isSuccess: false,
      });
    }

    return res.status(201).json({
      message: result?.message,
      isSuccess: result?.isSuccess,
    });
  } catch (error) {
    res.json({
      message: error.message || "There was a server side error",
      isSuccess: false,
    });
  }
};

module.exports = {
  sendContactMailController,
  checkVerifyEmailAddressController,
};
