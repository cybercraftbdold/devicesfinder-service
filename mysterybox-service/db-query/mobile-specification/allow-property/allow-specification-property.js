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

module.exports = {
  allowUserReviewsProperty,
  allowFaqProperty,
  allowBuyingGuideProperty,
};
