const ProsModel = require("../../models/pros-model/pros.model");

// Create Device Review
const createProsService = async (payload) => {
  let { title, deviceId, description } = payload;

  try {
    // Proceed to create a new ProsModel instance with the provided payload
    const pros = new ProsModel({
      title,
      deviceId,
      description,
    });

    // Attempt to save the new pros to the database
    const newPros = await pros.save();

    if (newPros) {
      return {
        isSuccess: true,
        response: newPros,
        message: "Device Pros created successfully",
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
  createProsService,
};
