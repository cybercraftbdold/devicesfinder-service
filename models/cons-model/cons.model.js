const mongoose = require("mongoose");
const metaInforamtionSchema = require("../../helpers/common-schema/metaInformationSchema");
const Schema = mongoose.Schema;

// Schema for Cons
const consSchema = new Schema(
  {
    title: String,
    deviceId: String,
    reviewStatus: String,
    description: String,
    metaInformation: metaInforamtionSchema,
  },
  { timestamps: true }
);

const ConsModel = mongoose.model("cons", consSchema);

module.exports = ConsModel;
