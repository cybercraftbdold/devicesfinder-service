const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    permission: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    role: {
      type: String,
    },
    password: {
      type: String,
    },
    picture: {
      altText: {
        type: String,
      },
      description: {
        type: String,
      },
      viewUrl: {
        type: String,
      },
    },
    address: {
      type: String,
    },
    phone: String,
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
    secretKey: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = model("user", userSchema);
module.exports = UserModel;
