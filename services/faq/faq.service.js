const FaqModel = require("../../models/faq-model/faq.model");

// Create Faq
const createFaqService = async (payload) => {
  let { title, deviceId, faqList } = payload;

  try {
    const duplicateFaq = await FaqModel.findOne({ deviceId });

    if (duplicateFaq)
      return {
        isSuccess: false,
        message: "Faq for this device is already created",
      };

    // Proceed to create a new DeviceReviewModel instance with the provided payload
    const faq = new FaqModel({
      title,
      deviceId,
      faqList,
    });

    // Attempt to save the new blog post to the database
    const newFaq = await faq.save();

    if (newFaq) {
      return {
        isSuccess: true,
        response: newFaq,
        message: "Device Faq created successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  createFaqService,
};
