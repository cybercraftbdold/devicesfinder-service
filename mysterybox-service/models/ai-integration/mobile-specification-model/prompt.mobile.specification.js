const { Schema, model } = require("mongoose");

const promMobileSpecificationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    websiteName: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    openAiKey: {
      type: String,
      required: true,
    },
    isOn: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const MobileSpecificationPromptModel = model(
  "mobile-prompt",
  promMobileSpecificationSchema
);

module.exports = MobileSpecificationPromptModel;
