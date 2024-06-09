const BlogModel = require("../../models/blog-model/blog.model");
const ComparisonModel = require("../../models/specification-model/comparison.model");
const MobileSpecificationModel = require("../../models/specification-model/specification.model");
const UserReviewModel = require("../../models/specification-model/user-review.model");
const sendQueue = require("../../utils/rabbitMQ/sendQueue");

const saveSpecificationToDb = async (mobileSpecificationData) => {
  // console.log(mobileSpecificationData);
  try {
    // Save each specification to the database
    const specificationData = {
      title: mobileSpecificationData?.title,
      specification: mobileSpecificationData?.specification,
      cons: mobileSpecificationData?.cons || "",
      pros: mobileSpecificationData?.pros || "",
      metaInformation: mobileSpecificationData?.metaInformation,
      mobileReview: mobileSpecificationData?.mobileReview[0],
      images: mobileSpecificationData?.mobileImage[0],
      buyingGuide: mobileSpecificationData?.buyingGuide[0],
      faqs: mobileSpecificationData?.faqs[0],
    };
    const specificationResponse = await MobileSpecificationModel.create(
      specificationData
    );
    if (specificationResponse?._id) {
      const userReviews = mobileSpecificationData?.userReviews[0];
      const comparison = mobileSpecificationData?.mobileComparisons[0];
      const mobileBlog = mobileSpecificationData?.mobileBlog[0];
      comparison.specificationId = specificationResponse?._id;
      userReviews.specificationId = specificationResponse?._id;
      mobileBlog.specificationId = specificationResponse?._id;
      comparison.images = specificationResponse?.images;
      mobileBlog.images = specificationResponse?.images;
      // user review model
      const reviewResponse = await UserReviewModel.create(userReviews);
      // comparison model
      const comparisonResponse = await ComparisonModel.create(comparison);
      const mobileresponse = await BlogModel.create(mobileBlog);

      if (reviewResponse && comparisonResponse && mobileresponse) {
        console.log("working");
        const resQueue = {
          message: "Data Published Successfully Completed",
          isSuccess: true,
        };
        // send response queue to consumer
        await sendQueue("responseQueue", resQueue);
        console.log("Data saved to database successfully.");
      } else {
        const resQueue = {
          message: "Review data or Comparison data not published",
          isSuccess: false,
        };
        // send response queue to consumer
        await sendQueue("responseQueue", resQueue);
      }
    }
  } catch (error) {
    console.error("Failed to save data:", error);
  }
};

module.exports = saveSpecificationToDb;
