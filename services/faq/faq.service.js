const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const FaqModel = require("../../models/faq-model/faq.model");

// Create Faq
const createFaqService = async (payload) => {
  let { title, deviceId, faqList } = payload;

  try {
    const duplicateFaq = await FaqModel.findOne({ deviceId });

    // updating faq if faq already exists
    if (duplicateFaq)
      return await updateWithDeviceIdService(payload, FaqModel, "Faq");

    // Proceed to create a new DeviceReviewModel instance with the provided payload
    const faq = new FaqModel({
      title,
      deviceId,
      faqList,
    });

    // Attempt to save the new faq to the database
    const newFaq = await faq.save();

    if (newFaq) {
      return {
        isSuccess: true,
        response: newFaq,
        message: "Device Faq published successfully",
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
