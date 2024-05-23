// allow specification data property
const allowUserReviewsProperty = {
  input: "$userReviews",
  as: "review",
  in: {
    name: "$$review.name",
    email: "$$review.email",
    rating: "$$review.rating",
    description: "$$review.description",
  },
};
// allow buying guide data property
const allowBuyingGuideProperty = {
  input: "$buyingGuide",
  as: "guide",
  in: {
    title: "$$guide.title",
    description: "$$guide.description",
  },
};
// allow faq data property
const allowFaqProperty = {
  input: "$faqs",
  as: "faq",
  in: {
    title: "$$faq.title",
    faqList: "$$faq.faqList",
  },
};
// allow mobile reivew data property
const allowReviewProperty = {
  input: "$mobileReview",
  as: "review",
  in: {
    title: "$$review.title",
    description: "$$review.description",
    metaInformation: "$$review.metaInformation",
  },
};

// allow mobile comparison data property
const allowComparisonProperty = {
  input: "$mobileComparisons",
  as: "comparison",
  in: {
    title: "$$comparison.title",
    phones: "$$comparison.phones",
    metaInformation: "$$comparison.metaInformation",
  },
};

module.exports = {
  allowUserReviewsProperty,
  allowFaqProperty,
  allowBuyingGuideProperty,
  allowReviewProperty,
  allowComparisonProperty,
};
