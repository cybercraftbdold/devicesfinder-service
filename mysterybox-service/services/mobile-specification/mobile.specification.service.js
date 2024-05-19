const MobileSpecificationContentModel = require("../../models/mobile-specification/mobile.specification.model");
const {
  generateMobileSpecification,
} = require("../ai-integration/mobile-specification/generate.mobile.specification.service");

// generate mobile specification content using  open ai
const generateMobileSpecificationService = async (payload) => {
  // let { title, status, specification, metaInformation } = payload;
  const generatedContent = await generateMobileSpecification(payload);
  try {
    if (generatedContent) {
      return {
        isSuccess: true,
        response: generatedContent,
        message: "Content generated successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
// create mobile specification after generate mobile specification content using open ai
const createMobileSpecificationService = async (payload) => {
  let { title, status, specification, metaInformation, phone } = payload;
  try {
    // Proceed to create a new BlogModel instance with the updated metaInformation
    const mobileSpecificationContentModel = new MobileSpecificationContentModel(
      {
        title,
        status,
        phone,
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
  generateMobileSpecificationService,
};
