const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for the meta information
const metaInfoSchema = new Schema(
  {
    canonicalUrl: String,
    mainKeyword: String,
    metaDescription: String,
    metaTitle: String,
    seedKeyword: [String],
  },
  { _id: false }
);
// Define schema for the brand information
const brandInfoSchema = new Schema(
  {
    manufactureName: String,
    manufactureWebsite: String,
    manufacturePhone: String,
    manufactureSocial: [String],
    manufactureEmail: [String],
    image: String,
  },
  { _id: false }
);

// Define the main schema for Mobile Specification
const mobileSpecificationSchema = new Schema(
  {
    title: String,
    deviceId: { type: String },
    specification: {
      type: Schema.Types.Mixed,
    },
    images: {
      type: Schema.Types.Mixed,
      require: true,
    },
    metaInformation: metaInfoSchema,
    brandInfo: brandInfoSchema,
    viewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create the model
const MobileSpecificationModel = mongoose.model(
  "MobileSpecification",
  mobileSpecificationSchema
);

module.exports = MobileSpecificationModel;
