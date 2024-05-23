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
      phoneId: {
        type: String,
        required: true,
      },
    },
    websiteInfo: {
      websiteName: {
        type: String,
        required: true,
      },
      websiteId: {
        type: String,
        required: true,
      },
    },
    faqList: [faqSchema],
  },
  {
    timestamps: true,
  }
);

const MobileFaqModel = model("mobile-faq", mobileFaqContentSchema);
module.exports = MobileFaqModel;
