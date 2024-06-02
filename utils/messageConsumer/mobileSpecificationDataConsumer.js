const sendQueue = require("../../utils/rabbitMQ/sendQueue");
const ComparisonModel = require("../../models/specification-model/comparison.model");
const MobileSpecificationModel = require("../../models/specification-model/specification.model");
const UserReviewModel = require("../../models/specification-model/user-review.model");
const connectRabbitMQ = require("../rabbitmqConnection");
const saveSpecificationToDb = require("../../helpers/database/saveToDatabase");

async function startMobileSpecificationConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("mobileSpecificationDataQueue", async (message) => {
    if (message) {
      const mobileSpecificationData = JSON.parse(message.content.toString())[0];
      // const website = mobileSpecificationData?.websiteInfo;
      await saveSpecificationToDb(mobileSpecificationData);
      channel.ack(message);
    } else {
      const resQueue = {
        message: "Content published failed",
        isSuccess: false,
      };
      await sendQueue("responseQueue", resQueue);
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
