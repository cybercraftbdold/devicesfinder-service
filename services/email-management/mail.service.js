const {
  FRONTEND_BASE_URL,
  BOX_SERVER_BASE_URL,
} = require("../../utils/env.config");
const { default: axios } = require("axios");

// send contact email
const sendContactMailService = async (payload) => {
  try {
    const response = await axios.post(
      `${BOX_SERVER_BASE_URL}/mystery-box/mail-manage/send-contact`,
      { ...payload, frontendUrl: FRONTEND_BASE_URL }
    );

    return {
      isSuccess: response?.data?.isSuccess,
      message: response?.data?.message,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// verirfy email address
const checkVerifyEmailAddressService = async (token) => {
  try {
    if (!token)
      return {
        isSuccess: false,
        message: "No Token is provided",
      };

    const response = await axios.post(
      `${BOX_SERVER_BASE_URL}/mystery-box/mail-manage/verify-email`,
      {},
      {
        params: { token },
      }
    );

    return {
      isSuccess: response?.data?.isSuccess,
      message: response?.data?.message,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  sendContactMailService,
  checkVerifyEmailAddressService,
};
