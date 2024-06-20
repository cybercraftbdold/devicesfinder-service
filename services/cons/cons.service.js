const ConsModel = require("../../models/cons-model/cons.model");

// Create Device Review
const createConsService = async (payload) => {
  let { title, deviceId, description } = payload;

  try {
    const duplicateCons = await ConsModel.findOne({
      deviceId,
    });

    // Checking for duplicate brand
    if (duplicateCons)
      return {
        isSuccess: false,
        message: "Already have a Cons with same deviceId.",
      };
    // Proceed to create a new ConsModel instance with the provided payload
    const cons = new ConsModel({
      title,
      deviceId,
      description,
    });

    // Attempt to save the new Cons to the database
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
