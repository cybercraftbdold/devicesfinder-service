const { Schema, model } = require("mongoose");
const faqSchema = Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
const mobileFaqContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mobileInfo: {
      phoneId: String,
    },
    faqList: [faqSchema],
  },
  {
    timestamps: true,
  }
);

const MobileFaqModel = model("mobile-faq", mobileFaqContentSchema);
module.exports = MobileFaqModel;
