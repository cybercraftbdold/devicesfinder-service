const { Schema, model } = require("mongoose");

const mobileSpecificationSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const aiMobileSpecificationModel = model("mobile-specification", mobileSpecificationSchema);
module.exports = aiMobileSpecificationModel;
