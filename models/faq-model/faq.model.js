const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const faqListSchema = new Schema({
  question: String,
  answer: String,
});

// Schema for FAQ
const faqSchema = new Schema(
  {
    title: String,
    deviceId: String,
    faqList: [faqListSchema],
  },
  { timestamps: true }
);

const FaqModel = mongoose.model("faq", faqSchema);

module.exports = FaqModel;
