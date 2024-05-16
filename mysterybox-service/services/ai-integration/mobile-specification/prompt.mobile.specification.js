const MobileSpecificationPromptModel = require("../../../models/ai-integration/mobile-specification-model/prompt.mobile.specification");

// create ai prompt for mobile specification (prompt and api key)
const createMobileGptPromptService = async (payload) => {
  let { title, prompt, openAiKey, isOn, websiteName } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileSpecificationPromptModel = new MobileSpecificationPromptModel({
      title,
      prompt,
      openAiKey,
      websiteName,
      isOn,
    });

    // Attempt to save the new blog post to the database
    const res = await mobileSpecificationPromptModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Ai integration update successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

//edit/update prtom and key
const updateMobileGptPromptService = async (id, data) => {
  try {
    const res = await MobileSpecificationPromptModel.updateOne(
      { _id: id },
      { $set: data }
    );
    if (res.modifiedCount > 0) {
      return {
        isSuccess: true,
        response: res,
        message: "Ai Integration Updated Successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// get prompt key for mobile specification
const getMobileGptPromptService = async (websiteName) => {
  try {
    if (websiteName) {
      const res = await MobileSpecificationPromptModel.findOne({
        websiteName: websiteName,
      });
      return {
        isSuccess: true,
        response: res,
        message: "Site name getting successfully",
      };
    } else {
      const res = await MobileSpecificationPromptModel.find({});
      if (res) {
        return {
          isSuccess: true,
          response: res,
          message: "data getting successfully",
        };
      } else {
        return {
          isSuccess: false,
          message: "Something wrong",
        };
      }
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

module.exports = {
  createMobileGptPromptService,
  updateMobileGptPromptService,
  getMobileGptPromptService,
};
