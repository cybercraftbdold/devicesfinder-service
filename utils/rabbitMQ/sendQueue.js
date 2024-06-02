const connectRabbitMQ = require("../rabbitmqConnection");

const sendQueue = async (queueName, data) => {
  // rabbit mq connection for sending data into mobile service
  const channel = await connectRabbitMQ();
  const msg = JSON.stringify(data);
  channel.sendToQueue(queueName, Buffer.from(msg));
};

module.exports = sendQueue;
