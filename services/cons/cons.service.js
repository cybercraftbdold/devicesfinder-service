const ConsModel = require("../../models/cons-model/cons.model");

// Create Device Review
const createConsService = async (payload) => {
  let { title, deviceId, description } = payload;

  try {
    // Proceed to create a new ConsModel instance with the provided payload
    const cons = new ConsModel({
      title,
      deviceId,
      description,
    });

    // Attempt to save the new pros to the database
    const newCons = await cons.save();

    if (newCons) {
      return {
        isSuccess: true,
        response: newCons,
        message: "Device Cons created successfully",
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
  createConsService,
};
