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
    });
    if (response) {
      return {
        isSuccess: true,
        response: response,
        message: "Content Generate Successfull",
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
