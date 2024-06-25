const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Meta Information Schema
const metaInforamtionSchema = new Schema(
  {
    canonicalUrl: String,
    mainKeyword: String,
    metaDescription: String,
    metaTitle: String,
    seedKeyword: [String],
  },
  { _id: false }
);

module.exports = metaInforamtionSchema;
