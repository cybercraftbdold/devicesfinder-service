const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
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

//Static way pre hooks development
userSchema.statics.isUserExist = async function (userEmail) {
  const user = await UserModel.findOne(
    { email: userEmail },
    {
      email: 1,
      password: 1,
      role: 1,
      twoFactorEnabled: 1,
      name: 1,
      secretKey: 1,
    }
  );
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword,
  savedPassword
) {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};
//Hashing the password using pre hook
userSchema.pre("save", async function (next) {
  // If the password field is modified (or newly created), hash it
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, Number(12));
  }
  next();
});
// Configuration to omit the password field from the user object when serialized to JSON
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

const UserModel = model("user", userSchema);
module.exports = UserModel;
// const { Schema, model } = require("mongoose");

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       // required: true,
//     },
//     permission: {
//       type: String,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       index: true,
//     },
//     role: {
//       type: String,
//     },
//     password: {
//       type: String,
//     },
//     picture: {
//       altText: {
//         type: String,
//       },
//       description: {
//         type: String,
//       },
//       viewUrl: {
//         type: String,
//       },
//     },
//     address: {
//       type: String,
//     },
//     phone: String,
//     twoFactorEnabled: {
//       type: Boolean,
//       default: false,
//     },
//     loginAttempts: {
//       type: Number,
//       default: 0,
//     },
//     lockUntil: Date,
//     secretKey: String,
//   },
//   {
//     timestamps: true,
//   }
// );

// const UserModel = model("user", userSchema);
// module.exports = UserModel;
