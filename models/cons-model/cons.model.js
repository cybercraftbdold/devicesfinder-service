const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Cons
const consSchema = new Schema(
  {
    title: String,
    deviceId: String,
    description: String,
  },
  { timestamps: true }
);

const ConsModel = mongoose.model("cons", consSchema);

module.exports = ConsModel;
