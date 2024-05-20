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
  //   add attribute
  {
    $addFields: {
      faqCount: { $size: "$faqData" },
      specificationCount: { $size: "$specificationData" },
      userReviewCount: { $size: "$userReviewData" },
    },
  },
  //   remove data
  {
    $project: {
      _idString: 0,
      faqData: 0,
      specificationData: 0,
      userReviewData: 0,
    },
  },
];

module.exports = {
  countMobileKeywordLookup,
};
