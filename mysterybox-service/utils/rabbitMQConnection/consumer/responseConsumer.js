const { connectRabbitMQ } = require("../rabbitmqConnection");

let responseDataStore = null;
async function startResponseConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("responseQueue", (message) => {
    if (message) {
      const responseData = JSON.parse(message.content.toString());
      responseDataStore = responseData;
      // Process data here
      channel.ack(message);
    }
  });
}

startResponseConsumer().catch(console.error);

function processResponseData() {
  if (responseDataStore) {
    return responseDataStore;
  } else {
    return {
      message: "Content published failed",
      isSuccess: false,
    };
  }
}
module.exports = { startResponseConsumer, processResponseData };
