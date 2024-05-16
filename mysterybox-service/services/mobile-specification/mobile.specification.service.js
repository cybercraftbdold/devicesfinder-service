const MobileSpecificationContentModel = require("../../models/mobile-specification/mobile.specification.model");

// create mobile specification
const createMobileSpecificationService = async (payload) => {
  let { title, status, specification, metaInformation } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileSpecificationContentModel = new MobileSpecificationContentModel(
      {
        title,
        status,
        specification,
        metaInformation,
      }
    );

    // Attempt to save the new blog post to the database
    const res = await mobileSpecificationContentModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Mobile specification create successfull",
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
  createMobileSpecificationService,
};
