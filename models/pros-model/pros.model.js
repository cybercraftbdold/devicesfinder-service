const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Pros
const prosSchema = new Schema(
  {
    title: String,
    deviceId: String,
    description: String,
  },
  { timestamps: true }
);

const ProsModel = mongoose.model("pros", prosSchema);

module.exports = ProsModel;
