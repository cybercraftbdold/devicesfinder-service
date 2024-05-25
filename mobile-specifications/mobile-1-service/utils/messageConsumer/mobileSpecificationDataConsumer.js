const MobileSpecificationModel = require("../../models/specification-model/specification.model");
const UserReviewModel = require("../../models/specification-model/user-review.model");
const connectRabbitMQ = require("../rabbitmqConnection");

async function startMobileSpecificationConsumer() {
  const channel = await connectRabbitMQ();
  channel.consume("mobileSpecificationDataQueue", async (message) => {
    if (message) {
      const mobileSpecificationData = JSON.parse(message.content.toString())[0];
      // console.log(mobileSpecificationData);
      try {
        // Save each specification to the database
        const comparison = mobileSpecificationData.mobileComparisons[0];
        const specificationData = {
          title: mobileSpecificationData?.title[0],
          specification: mobileSpecificationData?.specification[0],
          metaInformation: mobileSpecificationData?.metaInformation[0],
          mobileReview: mobileSpecificationData?.mobileReview[0],
          buyingGuide: mobileSpecificationData?.buyingGuide[0],
          faqs: mobileSpecificationData?.faqs[0],
        };
        const specificationResponse = await MobileSpecificationModel.create(
          specificationData
        );
        if (specificationResponse?._id) {
          const userReviews = mobileSpecificationData?.userReviews[0];
          const reviewData = {
            specificationId: specificationResponse?._id,
            name: userReviews?.name,
            email: userReviews?.email,
            rating: userReviews?.rating,
            description: userReviews?.description,
          };
          await UserReviewModel.create(reviewData);
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
