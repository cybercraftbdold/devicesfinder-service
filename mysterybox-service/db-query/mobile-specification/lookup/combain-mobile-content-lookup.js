const {
  allowFaqProperty,
  allowBuyingGuideProperty,
  allowUserReviewsProperty,
  allowReviewProperty,
  allowComparisonProperty,
  allowImageProperty,
} = require("../allow-property/allow-specification-property");

const combainMobileContentLookup = () => [
  // relation mobile buying guides
  {
    $lookup: {
      from: "mobile-buying-guides",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "buyingGuide",
    },
  },
  // relation mobile faq
  {
    $lookup: {
      from: "mobile-faqs",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "faqs",
    },
  },
  // relation to user reviews
  {
    $lookup: {
      from: "user-reviews",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "userReviews",
    },
  },
  // relation to mobile
  {
    $lookup: {
      from: "mobile-reviews",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "mobileReview",
    },
  },
  // relation to comparison
  {
    $lookup: {
      from: "mobile-comparisons",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "mobileComparisons",
    },
  },
  // relation to images
  {
    $lookup: {
      from: "mobile-images",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "mobileImage",
    },
  },

  {
    $project: {
      _id: 0,
      title: 1,
      specification: 1,
      metaInformation: 1,
      mobileInfo: 1,
      mobileComparisons: {
        $map: allowComparisonProperty,
      },
      mobileReview: {
        $map: allowReviewProperty,
      },
      faqs: {
        $map: allowFaqProperty,
      },
      buyingGuide: {
        $map: allowBuyingGuideProperty,
      },
      // userReviews: 1, //get all user reviews
      userReviews: {
        $map: allowUserReviewsProperty,
      },
      mobileImage: {
        $map: allowImageProperty,
      },
    },
  },
];

module.exports = {
  combainMobileContentLookup,
};
