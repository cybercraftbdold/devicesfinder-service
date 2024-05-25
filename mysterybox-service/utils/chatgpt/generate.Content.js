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
    const gptContent = response.data.choices[0].message.content;
    // Parse the JSON content
    const parsedJson = payload?.isText ? gptContent : JSON.parse(gptContent);
    // return response.data.choices[0].message.content;
    return parsedJson;
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

// const formatHtmlResponse = (content) => {
//   // Extracting list items and formatting them
//   const listRegex = /\d+\.\s(.+?)(?=\n|$)/g;
//   let listItems = [];
//   let match;

//   while ((match = listRegex.exec(content))) {
//     listItems.push(`<li>${match[1]}</li>`);
//   }

//   // If list items are found, wrap them in <ul>
//   if (listItems.length > 0) {
//     content = content.replace(listRegex, "").trim(); // Remove list from content
//     const listHtml = `<ul>${listItems.join("\n")}</ul>`;
//     content = content.replace(/\\n\\n/g, "</p><p>") + listHtml; // Adding listHtml to content
//   }

//   // Default paragraph wrap
//   return `<p>${content}</p>`;
// };
