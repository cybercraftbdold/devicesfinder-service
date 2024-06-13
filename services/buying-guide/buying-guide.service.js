const BuyingGuideModel = require("../../models/buying-guide-model/buying-guide.model");

// Create Buying Guide
const createBuyingGuideService = async (payload) => {
  let { title, deviceId, description } = payload;

  try {
    const duplicateBuyingGuide = await BuyingGuideModel.findOne({ deviceId });

    if (duplicateBuyingGuide)
      return {
        isSuccess: false,
        message: "Already have a Buying Guide for this deviceId",
      };

    // Proceed to create a new BuyingGuideModel instance with the provided payload
    const buyingGuide = new BuyingGuideModel({
      title,
      deviceId,
      description,
    });

    // Attempt to save the buying guide to the database
    const newBuyingGuide = await buyingGuide.save();

    if (newBuyingGuide) {
      return {
        isSuccess: true,
        response: newBuyingGuide,
        message: "Buying Guide created successfully",
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
  createBuyingGuideService,
};
