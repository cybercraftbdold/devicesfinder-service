const MobileSpecificationModel = require("../../models/review-model/review.model");
const connectRabbitMQ = require("../rabbitmqConnection");

async function startMobileSpecificationConsumer() {
  const channel = await connectRabbitMQ();
  // await channel.assertQueue("mysteryDataQueue", { durable: true });
  channel.consume("mobileSpecificationDataQueue", async (message) => {
    if (message) {
      const mobileSpecificationData = JSON.parse(message.content.toString());
      console.log(
        "Mobile specification Data Received:",
        mobileSpecificationData
      );
      try {
        // Save each specification to the database
        await MobileSpecificationModel.create(mobileSpecificationData);
        console.log("Data saved to database successfully.");
      } catch (error) {
        console.error("Failed to save data:", error);
      }

      channel.ack(message);
    }
  });
}
module.exports = { startMobileSpecificationConsumer };

// const connectRabbitMQ = require("../rabbitmqConnection");

// const specificationDataStore = [];
// async function startMobileSpecificationConsumer() {
//   const channel = await connectRabbitMQ();
//   channel.consume("mobileSpecificationData", (message) => {
//     if (message) {
//       const mobileSpecificationData = JSON.parse(message.content.toString());
//       console.log(
//         "Mobile specificatiion Data Received:",
//         mobileSpecificationData
//       );
//       specificationDataStore.splice(
//         0,
//         specificationDataStore.length,
//         ...mobileSpecificationData
//       ); // Replace old data with new data
//       // Process all users data here
//       channel.ack(message);
//     }
//   });
// }

// startMobileSpecificationConsumer().catch(console.error);

// function getSpecificationData() {
//   return specificationDataStore; // Function to access the stored user data
// }
// module.exports = { startMobileSpecificationConsumer, getSpecificationData };
