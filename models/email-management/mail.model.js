const { Schema, model } = require("mongoose");

const mailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean, // verified or none verified
      required: true,
    },
    websiteName: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MailModel = model("email", mailSchema);
module.exports = MailModel;
