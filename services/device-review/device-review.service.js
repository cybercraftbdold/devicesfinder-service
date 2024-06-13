const DeviceReviewModel = require("../../models/device-review-model/device-review.model");

// Create Device Review
const createDeviceReviewService = async (payload) => {
  let { title, deviceId, description, metaInformation } = payload;

  try {
    const duplicateDeviceReview = await DeviceReviewModel.findOne({ deviceId });

    if (duplicateDeviceReview)
      return {
        isSuccess: false,
        message: "Device Review for this id is already created.",
      };

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
