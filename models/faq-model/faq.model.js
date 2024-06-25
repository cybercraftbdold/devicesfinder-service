const mongoose = require("mongoose");
const metaInforamtionSchema = require("../../helpers/common-schema/metaInformationSchema");
const Schema = mongoose.Schema;

// FaqList Schema
const faqListSchema = new Schema({
  question: String,
  answer: String,
});

// Schema for FAQ
const faqSchema = new Schema(
  {
    title: String,
    deviceId: String,
    reviewStatus: String,
    faqList: [faqListSchema],
    metaInformation: metaInforamtionSchema,
  },
  { timestamps: true }
);

const FaqModel = mongoose.model("faq", faqSchema);

module.exports = FaqModel;
