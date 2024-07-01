const { default: mongoose } = require("mongoose");

// function for count documents based on reviewStatus
const countBasedOnReivewStatus = async (status, model) => {
  if (status) {
    const statusCount = await model.countDocuments({
      reviewStatus: status,
    });
    return {
      [status]: statusCount,
    };
  }

  const draftCount = await model.countDocuments({
    reviewStatus: "draft",
  });
  const publishedCount = await model.countDocuments({
    reviewStatus: "published",
  });
  const reviewCount = await model.countDocuments({
    reviewStatus: "review",
  });
  return {
    draft: draftCount,
    published: publishedCount,
    review: reviewCount,
  };
};

// get count of collections service
const getCountOfCollectionsService = async (status) => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    let totleCollectionsCount = [];

    for (const collection of collections) {
      const counts = await countBasedOnReivewStatus(
        status,
        db.collection(collection.name)
      );
      totleCollectionsCount.push({ [`${collection.name}Count`]: counts });
    }

    // const models = [
    //   { name: MobileSpecificationModel, title: "specificatonCount" },
    //   { name: ComparisonModel, title: "comparisonCount" },
    //   { name: DeviceReviewModel, title: "deviceReviewCount" },
    //   { name: UserReviewModel, title: "userReviewCount" },
    //   { name: BlogModel, title: "blogCount" },
    //   { name: BuyingGuideModel, title: "buyingGuideCount" },
    //   { name: FaqModel, title: "faqCount" },
    //   { name: ProsModel, title: "prosCount" },
    //   { name: ConsModel, title: "consCount" },
    // ];

    // const totleCollectionsCount = await Promise.all(
    //   models.map(async (model) => {
    //     const count = await countBasedOnReivewStatus(status, model.name);
    //     return { [model.title]: { ...count } };
    //   })
    // );

    if (!totleCollectionsCount)
      return {
        isSuccess: false,
        message: "Please make a valid request!",
      };

    return {
      isSuccess: true,
      message: "Data getting successfully",
      data: totleCollectionsCount,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  getCountOfCollectionsService,
};
