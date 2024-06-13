const DeviceReviewModel = require("../../models/device-review-model/device-review.model");

// Create Device Review
const createDeviceReviewService = async (payload) => {
  let { title, deviceId, description, metaInformation } = payload;

  try {
    // Proceed to create a new DeviceReviewModel instance with the provided payload
    const deviceReview = new DeviceReviewModel({
      title,
      deviceId,
      description,
      metaInformation,
    });

    // Attempt to save the new blog post to the database
    const newDeviceReview = await deviceReview.save();

    if (newDeviceReview) {
      return {
        isSuccess: true,
        response: newDeviceReview,
        message: "Device Review created successfully",
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
  createDeviceReviewService,
};
