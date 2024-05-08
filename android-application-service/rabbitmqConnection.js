const amqp = require("amqplib");
const envConfig = require("./utils/env.config");

// Use the CloudAMQP URL from your credentials
// const RABBITMQ_URL = 'amqps://zyhofqvj:cUzKnldbzpfhkWMvlK4-tIKUzJNG4kdE@kangaroo.rmq.cloudamqp.com/zyhofqvj';
// const RABBITMQ_URL = "amqp://cybercraft:cybercraft@195.35.32.241:5672/";
const RABBITMQ_URL = `${envConfig.RABBITMQ_URL}`;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue("userDataQueue"); // Queue for user creation events
    return channel;
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    throw error;
  }
}

module.exports = connectRabbitMQ;