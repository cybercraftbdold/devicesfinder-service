const ReviewSchema = require("../../models/news-reviews-model/reviews.model");

const createReivews = async (payload) => {
  const { title, description, metaInformation } = payload;

  try {
    //   // Generate a unique canonical URL for the blog post
    //   const uniqueCanonicalUrl = await generateUniqueIdentifier(
    //     ServiceModel,
    //     metaInformation.canonicalUrl,
    //     "metaInformation.canonicalUrl"
    //   );
    // Update metaInformation with the unique canonical URL
    // metaInformation.canonicalUrl = uniqueCanonicalUrl;
    const reviewSchema = new ReviewSchema({
      title,
      description,
      metaInformation,
    });

    const res = await reviewSchema.save();

    if (res) {
      return {
        isSuccess: true,
        message: "Review Posted successfully!",
        response: res,
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  createReivews,
};
