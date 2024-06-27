const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const blogSchema = new Schema(
  {
    deviceId: String,
    keywordId: String,
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    // images: Schema.Types.Mixed,
    image: {
      imageUrl: { type: String, default: "" },
      title: { type: String, default: "" },
      altText: { type: String, default: "" },
      caption: { type: String, default: "" },
      description: { type: String, default: "" },
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

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;
