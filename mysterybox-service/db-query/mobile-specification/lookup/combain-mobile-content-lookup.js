const {
  allowFaqProperty,
  allowBuyingGuideProperty,
  allowUserReviewsProperty,
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
  // relation to mobile specification
  {
    $lookup: {
      from: "user-reviews",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "userReviews",
    },
  },

  {
    $project: {
      title: 1,
      specification: 1,
      metaInformation: 1,
      mobileInfo: 1,
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
    },
  },
];

module.exports = {
  combainMobileContentLookup,
};
