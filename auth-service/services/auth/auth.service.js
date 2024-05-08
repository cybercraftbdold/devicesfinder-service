const UserModel = require("../../models/auth-model/auth.model");

const registerService = async (userData) => {
  try {
    // Check if the user already exists in the database
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      // If user already exists, throw an error
      throw new Error("Email already in use");
    }
    const user = await UserModel.create(userData);
    return {
      isSuccess: true,
      message: "Registration successfully completed",
      user,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  registerService,
};
