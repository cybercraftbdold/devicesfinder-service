const connectRabbitMQ = require("../rabbitmqConnection");
const userDataStore = [];
async function startAllUsersConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("allUsersDataQueue", (message) => {
    if (message) {
      const allUsers = JSON.parse(message.content.toString());
      console.log("All Users Data Received:", allUsers);
      userDataStore.splice(0, userDataStore.length, ...allUsers); // Replace old data with new data
      // Process all users data here
      channel.ack(message);
    }
  });
}

startAllUsersConsumer().catch(console.error);

function getUserData() {
  return userDataStore; // Function to access the stored user data
}
module.exports = { startAllUsersConsumer, getUserData };
