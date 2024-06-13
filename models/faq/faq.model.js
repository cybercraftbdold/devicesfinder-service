const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for FAQ
const faqSchema = new Schema(
  {
    title: String,
    deviceId: String,
    question: String,
    answer: String,
  },
  { timestamps: true }
);

const FaqModel = mongoose.model("faq", faqSchema);

module.exports = FaqModel;
