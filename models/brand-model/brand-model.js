const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the main schema for Mobile Specification
const brandSchema = new Schema(
  {
    title: String,
    image: String,
  },
  { timestamps: true }
);

const BrandModel = mongoose.model("brand", brandSchema);

module.exports = BrandModel;
