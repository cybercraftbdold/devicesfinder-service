const connectRabbitMQ = require("../rabbitmqConnection");

async function startAllUsersConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("allUsersDataQueue", (message) => {
    if (message) {
      const allUsers = JSON.parse(message.content.toString());
      console.log("All Users Data Received:", allUsers);
      // Process all users data here
      channel.ack(message);
    }
  });
}

startAllUsersConsumer().catch(console.error);
module.exports = startAllUsersConsumer;
