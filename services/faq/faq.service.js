const FaqModel = require("../../models/faq-model/faq.model");

// Create Faq
const createFaqService = async (payload) => {
  let { title, deviceId, description, metaInformation } = payload;

  try {
    // Proceed to create a new DeviceReviewModel instance with the provided payload
    const faq = new FaqModel({
      title,
      deviceId,
      description,
      metaInformation,
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
