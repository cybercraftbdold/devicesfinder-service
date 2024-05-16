const axios = require("axios");
const generateGptContent = async (payload) => {
  const OPENAI_API_KEY = payload.openAiKey || process?.env.OPEN_API_KEY;

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
        content: payload?.prompt,
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      { headers }
    );
    return response.data.choices[0].message.content;
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
