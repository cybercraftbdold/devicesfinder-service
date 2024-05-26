const ComparisonModel = require("../../models/specification-model/comparison.model");
const MobileSpecificationModel = require("../../models/specification-model/specification.model");
const UserReviewModel = require("../../models/specification-model/user-review.model");
const connectRabbitMQ = require("../rabbitmqConnection");

async function startMobileSpecificationConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("mobileSpecificationDataQueue", async (message) => {
    if (message) {
      const mobileSpecificationData = JSON.parse(message.content.toString())[0];
      const website = mobileSpecificationData?.websiteInfo;
      // console.log(mobileSpecificationData);
      try {
        // Save each specification to the database
        const specificationData = {
          title: mobileSpecificationData?.title,
          specification: mobileSpecificationData?.specification,
          metaInformation: mobileSpecificationData?.metaInformation,
          mobileReview: mobileSpecificationData?.mobileReview[0],
          buyingGuide: mobileSpecificationData?.buyingGuide[0],
          faqs: mobileSpecificationData?.faqs[0],
        };
        const specificationResponse = await MobileSpecificationModel.create(
          specificationData
        );
        if (specificationResponse?._id) {
          const userReviews = mobileSpecificationData?.userReviews[0];
          const comparison = mobileSpecificationData.mobileComparisons[0];
          comparison.specificationId = specificationResponse?._id;
          userReviews.specificationId = specificationResponse?._id;
          // user review model
          await UserReviewModel.create(userReviews);
          // comparison model
          await ComparisonModel.create(comparison);
        }
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
