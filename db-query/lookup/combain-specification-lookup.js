const {
  allowFaqProperty,
  allowBuyingGuideProperty,
  allowUserReviewsProperty,
  allowReviewProperty,
  allowComparisonProperty,
  allowImageProperty,
  allowBlogProperty,
} = require("../allow-property/allow-specification-property");

// ready data for published the content
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
  // relation to blog
  {
    $lookup: {
      from: "mobile-blogs",
      localField: "mobileInfo.phoneId",
      foreignField: "mobileInfo.phoneId",
      as: "mobileBlog",
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
      mobileBlog: {
        $map: allowBlogProperty,
      },
    },
  },
];

// combain mobile specification content with all proparty
const combainMobileSpecificationLookup = () => [
  {
    $addFields: {
      deviceIdStr: { $toString: "$_id" },
    },
  },
  // user reviws
  {
    $lookup: {
      from: "user-reviews",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "reviews",
    },
  },
  // buying guide
  {
    $lookup: {
      from: "buying-guides",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "buyingGuides",
    },
  },
  // comparisons
  {
    $lookup: {
      from: "comparisons",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "comparisons",
    },
  },

  // cons
  {
    $lookup: {
      from: "cons",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "cons",
    },
  },
  // pros
  {
    $lookup: {
      from: "pros",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "pros",
    },
  },
  // faq
  {
    $lookup: {
      from: "faqs",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "faq",
    },
  },

  // blogs
  {
    $lookup: {
      from: "blogs",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "blogs",
    },
  },
  // device reivw
  {
    $lookup: {
      from: "devicereviews",
      localField: "deviceId",
      foreignField: "deviceId",
      as: "deviceReview",
    },
  },
  {
    $addFields: {
      averageRating: { $avg: "$reviews.rating" },
    },
  },
  {
    $project: {
      deviceIdStr: 0,
      "reviews._id": 0,
      "reviews.deviceId": 0,
    },
  },
];

module.exports = {
  combainMobileContentLookup,
  combainMobileSpecificationLookup,
};
