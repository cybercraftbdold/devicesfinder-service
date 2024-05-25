const amqp = require("amqplib");

// Use the CloudAMQP URL from your credentials
const RABBITMQ_URL = "amqp://cybercraft:cybercraft@195.35.32.241:5672/";
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("mobileSpecificationDataQueue", { durable: true });
    await channel.assertQueue("responseQueue", { durable: true });
    // await channel.assertQueue("allUsersDataQueue", { durable: true });
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    throw error;
  }
}

module.exports = { connectRabbitMQ };
