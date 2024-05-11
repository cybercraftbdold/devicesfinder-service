const { Schema, model } = require("mongoose");

const RoleSchema = new Schema(
  {
    roleName: String,
    menus: [{ title: String, link: String, isDynamic: Boolean }],
  },
  { timestamps: true }
);

const RoleModel = model("role", RoleSchema);
module.exports = RoleModel;
