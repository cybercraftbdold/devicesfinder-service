const countMobileKeywordLookup = () => [
  {
    $addFields: {
      _idString: { $toString: "$_id" }, // Convert ObjectId to string
    },
  },
  {
    $lookup: {
      from: "mobile-faqs", // Collection name
      localField: "_idString", // Local field
      foreignField: "mobileInfo.phoneId", // Foreign field
      as: "faqData",
    },
  },
  {
    $lookup: {
      from: "mobile-specifications", // Collection name
      localField: "_idString", // Local field
      foreignField: "mobileInfo.phoneId", // Foreign field
      as: "specificationData",
    },
  },
  //   relation to collection
  {
    $lookup: {
      from: "user-reviews", // Collection name
      localField: "_idString", // Local field
      foreignField: "mobileInfo.phoneId", // Foreign field
      as: "userReviewData",
    },
  },
  //   relation to collection buying guide
  {
    $lookup: {
      from: "mobile-buying-guides",
      localField: "_idString",
      foreignField: "mobileInfo.phoneId",
      as: "buyingData",
    },
  },
  //   relation to collection buying guide
  {
    $lookup: {
      from: "mobile-reviews",
      localField: "_idString",
      foreignField: "mobileInfo.phoneId",
      as: "reviewData",
    },
  },
   //   relation to collection mobile comparisons
   {
    $lookup: {
      from: "mobile-comparisons",
      localField: "_idString",
      foreignField: "mobileInfo.phoneId",
      as: "comparisonData",
    },
  },
  //   add attribute
  {
    $addFields: {
      faqCount: { $size: "$faqData" },
      specificationCount: { $size: "$specificationData" },
      userReviewCount: { $size: "$userReviewData" },
      buyingGuideCount: { $size: "$buyingData" },
      reviewCount: { $size: "$reviewData" },
      comparisonCount: { $size: "$comparisonData" },
    },
  },
  //   remove data
  {
    $project: {
      _idString: 0,
      faqData: 0,
      specificationData: 0,
      userReviewData: 0,
      buyingData: 0,
      reviewData: 0,
      comparisonData: 0,
    },
  },
];

module.exports = {
  countMobileKeywordLookup,
};
