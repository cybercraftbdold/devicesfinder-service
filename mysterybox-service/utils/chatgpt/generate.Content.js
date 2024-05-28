const axios = require("axios");
const {
  isHtmlFormatConstant,
  metaInformationConstant,
  jsonFormateConstant,
} = require("./gpt.constant");
const generateGptContent = async (payload) => {
  const OPENAI_API_KEY = payload.openAiKey || process?.env.OPEN_API_KEY;
  let prompt = payload?.prompt;
  // check prompt
  if (payload?.isHtmlFormat) {
    prompt = `${payload?.prompt}-${isHtmlFormatConstant}`;
  } else if (payload?.isJsonFormat) {
    if (payload?.jsonResponseFormat) {
      prompt = `${payload?.prompt}-${
        payload.isMetaInformation && metaInformationConstant
      } - Please Follow This Content format - ${
        payload?.jsonResponseFormat
      }-${jsonFormateConstant}`;
    } else {
      return { message: "Json formate missing!", isSuccess: false };
    }
  } else if (payload?.isTextFormat) {
    prompt = `${payload?.prompt}`;
  } else {
    return { message: "Paramiter missing!", isSuccess: false };
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  };
  // Note the change in the data structure for the Chat Completion API
  const data = {
    model: "gpt-3.5-turbo", // Ensure this is a chat model
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      { headers }
    );
    const gptContent = response.data.choices[0].message.content;
    let sendResponseData = null;
    // let contentResponse =payload?.isText || payload?.isHtmlFormat? gptContent: JSON.parse(gptContent);
    // check response
    if (payload?.isHtmlFormat) {
      const cleanedHtmlContent = gptContent.replace(/\n/g, " ");
      sendResponseData = cleanedHtmlContent;
    } else if (payload?.isJsonFormat) {
      const parseJsonData = JSON.parse(gptContent);
      sendResponseData = parseJsonData;
    } else if (payload?.isTextFormat) {
      sendResponseData = gptContent;
    }
    // return response.data.choices[0].message.content;
    return { response: sendResponseData, isSuccess: true };
  } catch (error) {
    // Error handling remains unchanged
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    throw error;
  }
};

module.exports = {
  generateGptContent,
};
