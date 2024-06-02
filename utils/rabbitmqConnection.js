const amqp = require("amqplib");
const envConfig = require("./env.config");
const RABBITMQ_URL = `${envConfig.RABBITMQ_URL}`;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("mobileSpecificationDataQueue");
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    throw error;
  }
}

module.exports = connectRabbitMQ;
