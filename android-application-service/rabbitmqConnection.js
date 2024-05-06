const amqp = require('amqplib');

// Use the CloudAMQP URL from your credentials
const RABBITMQ_URL = 'amqps://zyhofqvj:cUzKnldbzpfhkWMvlK4-tIKUzJNG4kdE@kangaroo.rmq.cloudamqp.com/zyhofqvj';

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue('userDataQueue');  // Queue for user creation events
        return channel;
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        throw error;
    }
}

module.exports = connectRabbitMQ;
