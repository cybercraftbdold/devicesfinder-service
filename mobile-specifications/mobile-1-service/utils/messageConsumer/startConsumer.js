const connectRabbitMQ = require("../rabbitmqConnection");

async function startConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("mobileSpecificationData", (message) => {
    if (message !== null) {
      const userData = JSON.parse(message.content.toString());
      console.log("Received user data:", userData);
      // Optionally process or store the user data as needed
      channel.ack(message);
    }
  });
}

startConsumer().catch((err) => {
  console.error("Failed to start the RabbitMQ Consumer:", err);
});

module.exports = startConsumer;
