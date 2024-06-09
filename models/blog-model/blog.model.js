const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const blogSchema = new Schema(
  {
    specificationId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    images: Schema.Types.Mixed,

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

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;
