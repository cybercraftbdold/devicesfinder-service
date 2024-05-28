const {
  generateGptContent,
} = require("../../../utils/chatgpt/generate.Content");

// generate mobile specification
const generateMobileSpecification = async (payload) => {
  let { openAiKey, prompt } = payload;
  try {
    const response = await generateGptContent({
      openAiKey: openAiKey,
      prompt: prompt,
      isTextFormat: payload?.isTextFormat,
      isHtmlFormat: payload?.isHtmlFormat,
      isJsonFormat: payload?.isJsonFormat,
      jsonResponseFormat: payload?.jsonResponseFormat,
      isMetaInformation: payload?.isMetaInformation,
    });
    console.log(!response.isSuccess);
    if (response.isSuccess) {
      return {
        isSuccess: true,
        response: response?.response,
        message: "Content Generate Successfull",
      };
    } else {
      return {
        isSuccess: false,
        message: response?.message,
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
  generateMobileSpecification,
};
