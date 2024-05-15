const { model, Schema } = require("mongoose");


const reviewsSchema = new Schema(
  {
    title: {
      type: String,
      require: Boolean,
    },
    description: {
      type: String,
      require: Boolean,
    },
    metaInformation: {
      canonicalUrl: String,
      mainKeyword: String,
      metaDescription: String,
      metaTitle: String,
      seedKeyword: [String],
    },
  },
  { timestamps: true }
);
const ReviewSchema = model("reviews", reviewsSchema);
module.exports = ReviewSchema;
