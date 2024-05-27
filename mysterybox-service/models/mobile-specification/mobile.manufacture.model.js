const { Schema, model } = require("mongoose");
const mobileManufactureSchema = new Schema(
  {
    manufactureName: {
      type: String,
      require: true,
    },
    manufactureWebsite: {
      type: String,
      require: true,
    },
    manufacturePhone: {
      type: String,
      require: true,
    },
    manufactureSocial: {
      type: [String],
      require: true,
    },
    manufactureEmail: {
      type: [String],
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const MobileManufactureModel = model(
  "mobile-manufacture",
  mobileManufactureSchema
);

module.exports = MobileManufactureModel;
