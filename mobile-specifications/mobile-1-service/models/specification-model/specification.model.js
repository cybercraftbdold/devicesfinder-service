const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for the meta information
const metaInfoSchema = new Schema(
  {
    canonicalUrl: String,
    mainKeyword: String,
    metaDescription: String,
    metaTitle: String,
    seedKeyword: [String],
  },
  { _id: false }
);

// Define schema for the mobile specification comparisons
const comparisonSchema = new Schema(
  {
    title: String,
    phones: [
      {
        specificationId: String,
        title: String,
        specification: {
          processor: String,
          display: String,
          battery: String,
          camera: String,
          os: String,
        },
      },
    ],
    metaInformation: metaInfoSchema,
  },
  { _id: false }
);

// Define schema for the reviews
const reviewSchema = new Schema(
  {
    title: String,
    description: String,
    metaInformation: metaInfoSchema,
  },
  { _id: false }
);

// Define schema for the FAQs
const faqSchema = new Schema(
  {
    title: String,
    faqList: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { _id: false }
);

// Define schema for the buying guide
const buyingGuideSchema = new Schema({
  title: String,
  description: String,
});

// Define schema for user reviews
const userReviewSchema = new Schema(
  {
    name: String,
    email: String,
    rating: Number,
    description: String,
  },
  { _id: false }
);

// Define the main schema for Mobile Specification
const mobileSpecificationSchema = new Schema(
  {
    // _id: String,
    title: String,
    mobileInfo: {
      phoneId: String,
    },
    specification: {
      General: String,
    },
    metaInformation: metaInfoSchema,
    mobileComparisons: [comparisonSchema],
    mobileReview: [reviewSchema],
    faqs: [faqSchema],
    buyingGuide: [buyingGuideSchema],
    userReviews: [userReviewSchema],
  },
  { timestamps: true }
);

// Create the model
const MobileSpecificationModel = mongoose.model(
  "MobileSpecification",
  mobileSpecificationSchema
);

module.exports = MobileSpecificationModel;
