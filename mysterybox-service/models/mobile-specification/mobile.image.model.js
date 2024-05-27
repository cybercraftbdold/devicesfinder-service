const { Schema, model } = require("mongoose");
const mobileImageSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    mobileInfo: {
      phoneId: {
        type: String,
        required: true,
      },
    },
    profileImage: {
      type: String,
      require: true,
    },
    contentImages: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const MobileImageModel = model("mobile-image", mobileImageSchema);

module.exports = MobileImageModel;
