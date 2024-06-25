const mongoose = require("mongoose");
const metaInforamtionSchema = require("../../helpers/common-schema/metaInformationSchema");
const Schema = mongoose.Schema;

// Schema for Pros
const prosSchema = new Schema(
  {
    title: String,
    deviceId: String,
    reviewStatus: String,
    description: String,
    metaInformation: metaInforamtionSchema,
  },
  { timestamps: true }
);

const ProsModel = mongoose.model("pros", prosSchema);

module.exports = ProsModel;
