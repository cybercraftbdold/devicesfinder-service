const {
  createToken,
  verifyToken,
  createResetToken,
} = require("../../helpers/jwtHelpers");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/auth-model/auth.model");
const speakeasy = require("speakeasy");

const envConfig = require("../../utils/env.config");
const generateQRCodeImage = require("../../helpers/qrcode.helpers");
const { sendEmailToUser } = require("../../helpers/mail.helpers");
const {
  registrationInvitaionTemplete,
  forgotPasswordTemplete,
} = require("../../utils/html-templete/html.templete");

// create user
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
// get all users service
const getAllUserService = async (limit, skip = 0, searchText, filters) => {
  try {
    let query = {};
    if (searchText) {
      query.$or = [
        { name: { $regex: searchText, $options: "i" } },
        { email: { $regex: searchText, $options: "i" } },
        { role: { $regex: searchText, $options: "i" } },
      ];
    }

    if (filters.role) {
      query.role = filters.role;
    }

    const aggregationPipeline = [
      { $match: query },
      {
        $facet: {
          users: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "total" }],
        },
      },
    ];

    const [result] = await UserModel.aggregate(aggregationPipeline);
    const totalUsers = result.totalCount[0] ? result.totalCount[0].total : 0;

    return {
      isSuccess: true,
      users: result.users,
      totalUsers,
    };
  } catch (error) {
    console.error("Error fetching users:");
    return {
      isSuccess: false,
      message: "Failed to fetch users",
    };
  }
};
// login user service
const loginService = async (loginData) => {
  const { email: userEmail, password } = loginData;
  // Check is user exist
  const isUserExist = await UserModel.isUserExist(userEmail);
  if (!isUserExist) {
    return {
      status_code: 400,
      isSuccess: false,
      message: "User does not exist",
    };
  }

  //Matching the password
  if (
    isUserExist.password &&
    !(await UserModel.isPasswordMatched(password, isUserExist?.password))
  ) {
    return {
      status_code: 400,
      isSuccess: false,
      message: "Incorrect email or password.",
    };
  }

  const { email, role, twoFactorEnabled, name } = isUserExist;
  // Access token for user persistance
  const accessToken = createToken(
    { email, role, twoFactorEnabled, name },
    envConfig.JWT_SECRET,
    "1d"
  );
  const refreshToken = createToken(
    { email, role, twoFactorEnabled, name },
    envConfig.JWT_REFRESH_SECRET,
    "365d"
  );

  return {
    accessToken,
    refreshToken,
  };
};
// Generate QRcode for two factor authentication
const generateQRCodeService = async (userEmail) => {
  const userData = await UserModel.isUserExist(userEmail);
  if (!userData) {
    // Handle case where user doesn't exist
    return { isSuccess: false, message: "User not found." };
  }
  const TwoFactor = userData?.twoFactorEnabled;
  const { name, secretKey } = userData;
  if (!TwoFactor) {
    let base32Secret;
    // Check if user already has a secret key
    if (!secretKey) {
      // Generate a new secret key for the user
      const newSecretKey = speakeasy.generateSecret();
      base32Secret = newSecretKey.base32;
      await UserModel.updateOne(
        { email: userEmail },
        { secretKey: base32Secret }
      );
    } else {
      base32Secret = secretKey;
    }

    const companyName = "Mystery Box Admin";
    // Include the username in the label, separated by a colon or hyphen
    const label = encodeURIComponent(`${companyName}: ${name}`);
    const otpauthUrl = `otpauth://totp/${label}?secret=${base32Secret}&issuer=${encodeURIComponent(
      companyName
    )}`;

    // Generate QR code for the user
    const imageUrl = await generateQRCodeImage(otpauthUrl);

    return {
      qrcode: imageUrl,
    };
  } else {
    return { isSuccess: false, message: "User already enabled 2fa" };
    // return null;
  }
};
// verify user using otp for update 2 factor authentication
const verifyUserService = async (payload) => {
  try {
    const { token, email } = payload;
    // Retrieve the user's secret key and verification status from the database
    const userData = await UserModel.findOne({ email: email });
    const userSecret = userData?.secretKey;
    const isUserVerified = userData?.twoFactorEnabled;
    if (!userSecret) {
      return { success: false, message: "User secret key not found" };
    }

    const verifiedUser = speakeasy.totp.verify({
      secret: userSecret,
      encoding: "base32",
      token: token,
      window: 6,
    });
    if (verifiedUser) {
      // Update the user's status as verified in the database
      if (!isUserVerified) {
        await UserModel.updateOne({ email: email }, { twoFactorEnabled: true });
      }

      return { success: true, message: "Two-step authentication successful" };
    } else {
      return { success: false, message: "Invalid or expired token" };
    }
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};
// registration user by admin
const registrationByAdminService = async (userData) => {
  try {
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      // If user already exists, throw an error
      throw new Error("Email already in use");
    }
    const user = await UserModel.create(userData);
    // Generate a token for the new user to update their profile
    const updateProfileToken = await createToken(
      { id: user.email },
      envConfig.JWT_SECRET,
      "72h"
    );
    // Link to the profile update page
    const updateProfileLink = `${envConfig?.FRONTEND_BASE_URL}/self-registation?token=${updateProfileToken}`;
    // Sending an email to the new user with the profile update link
    const emailResult = await sendEmailToUser(
      user.email,
      registrationInvitaionTemplete(user.email, updateProfileLink) // invitation link
    );
    // Return success response
    return {
      isSuccess: true,
      message: "Email send successfully",
      emailResult,
      Invitedlink: updateProfileLink,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
// self registration by user to email invited link
const selfRegistrationService = async (data) => {
  try {
    const decoded = verifyToken(data.token, envConfig.JWT_SECRET);
    const userEmail = decoded.id;

    const user = await UserModel.findOne({ email: userEmail });
    if (!user) {
      return { success: false, message: "User Not Found!" };
    }

    if (user?.password) {
      return {
        success: false,
        message: "Cannot update  profile from this link",
      };
    }
    // Exclude 'email' and 'role' fields from the update payload
    delete data.email;
    delete data.role;
    // Check if a new password is provided and hash it
    if (data?.password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(data.password, Number(12));
      // Replace the plaintext password with the hashed version in the data object
      data.password = hashedPassword;
    }

    const updateResult = await UserModel.updateOne(
      { email: userEmail },
      { $set: data }
    );

    // Check if the update was successful
    if (updateResult.modifiedCount === 0) {
      return { success: false, message: "Failed to update user information." };
    }

    return { success: true, message: "User information updated successfully." };
  } catch (error) {
    console.error("Self-registration error:", error);
    return { success: false, message: "Internal server error." };
  }
};
// delete user service
const deleteUserService = async (deletedId) => {
  try {
    const result = await UserModel.deleteOne({ _id: deletedId });
    if (result.deletedCount === 1) {
      return {
        isSuccess: true,
        message: "User Deleted Successfully!",
      };
    } else {
      return { isSuccess: false, message: "User not found." };
    }
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    return {
      isSuccess: false,
      message: "An unexpected error occurred.",
    };
  }
};
// refresh token service
const refreshTokenService = async (token) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, envConfig.JWT_REFRESH_SECRET);
  } catch (error) {
    return {
      success: false,
      message: "Invalid token",
    };
  }
  const { email, role } = verifiedToken;
  const isUserExist = await UserModel.findOne({ email: email });
  if (!isUserExist) {
    return {
      success: false,
      message: "User doesn't exist",
    };
  }
  const { twoFactorEnabled, name } = isUserExist;

  // Access token for user persistance
  const newAccessToken = createToken(
    { email, role, twoFactorEnabled, name },
    envConfig.JWT_SECRET,
    "1d"
  );

  return {
    accessToken: newAccessToken,
  };
};
// restart to factor authentication
const restartToFAService = async (email, twoFactorEnabled) => {
  try {
    // Assuming UserModel is your Mongoose model for the user collection
    const res = await UserModel.updateOne(
      { email: email },
      { $set: { twoFactorEnabled: twoFactorEnabled, secretKey: "" } }
    );
    if (res.modifiedCount > 0) {
      return {
        isSuccess: true,
        response: res,
        message: "Two-factor authentication restart successfully",
      };
    } else {
      return {
        isSuccess: false,
        message:
          "No document found or the two-factor authentication status is already set to the desired value",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};
// update user / admin admin name
const updateUserService = async (userData) => {
  try {
    const {
      params: { email },
      body,
    } = userData;

    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const { oldPassword, newPassword } = body;
    let bodyToUpdate = { ...body };

    // Check if user wants to change the password
    if (oldPassword && newPassword) {
      // Validate provided data
      if (oldPassword === newPassword) {
        return {
          success: false,
          message: "You can't use old password as new password",
        };
      }

      // Compare the provided old password with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        return {
          success: false,
          message: "Invalid old password",
        };
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(
        newPassword,
        Number(configuration.bcrypt_salt_rounds)
      );

      // Update body with hashed password
      bodyToUpdate = { ...bodyToUpdate, password: hashedPassword };
    }

    // Update user's data with the updated body
    await UserModel.findOneAndUpdate(
      { email: existingUser.email },
      bodyToUpdate,
      {
        new: true,
      }
    );

    // Fetch the updated user data
    const updatedUserData = await UserModel.findOne({ email });

    if (!updatedUserData) {
      return {
        success: false,
        message: "Failed to fetch updated user data",
      };
    }

    return {
      success: true,
      data: updatedUserData,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user",
    };
  }
};
// get single users
const getSingleService = async (email) => {
  try {
    const user = await UserModel?.findOne({ email: email });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    } else {
      return {
        success: true,
        data: user,
        message: "Data fetching successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetching user",
    };
  }
};

// forgot password service
const forgotPasswordService = async (email) => {
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    throw new Error("User not found");
  }
  const passResetToken = await createResetToken(
    { id: user?._id },
    envConfig.JWT_SECRET,
    "50m"
  );

  const resetLink = `${envConfig.FRONTEND_BASE_URL}/reset-password?token=${passResetToken}`;
  const userEmail = user?.email;
  const result = await sendEmailToUser(
    userEmail,
    forgotPasswordTemplete(user, resetLink)
  );
  return result;
};

const resetPasswordService = async (payload) => {
  try {
    const { token, newPassword } = payload;
    const decoded = verifyToken(token, envConfig.JWT_SECRET);
    const userId = decoded.id;

    // Update password
    const user = await UserModel.findById(userId);
    if (!user) {
      return { success: false, message: "Invalid or expired token" };
    }

    user.password = newPassword;
    await user.save();

    // Respond with success message
    return { success: true, message: "Password Reset Successfully" };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

// Change password service for profile
const changePasswordService = async (currentUser, payload) => {
  const { oldPassword, newPassword } = payload;
  // Validate provided data
  if (!oldPassword || !newPassword) {
    return {
      success: false,
      message: "Old password and new password are required",
    };
  }
  // Ensure that the password field in the database is not null or undefined
  if (oldPassword === newPassword) {
    return { success: false, message: "You can't use old password" };
  }

  try {
    const existingUser = await UserModel.findOne({ email: currentUser.email });

    if (!existingUser) {
      return { success: false, message: "User not found!" };
    }

    // Compare the provided old password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return { success: false, message: "Invalid old password!" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, Number(12));
    const updateData = {
      password: hashedPassword,
    };

    await UserModel.findOneAndUpdate(
      { email: existingUser.email },
      updateData,
      {
        new: true,
      }
    );

    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    return { success: false, message: "Internal server error" };
  }
};

module.exports = {
  registerService,
  getAllUserService,
  loginService,
  generateQRCodeService,
  verifyUserService,
  registrationByAdminService,
  selfRegistrationService,
  deleteUserService,
  refreshTokenService,
  restartToFAService,
  updateUserService,
  getSingleService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
};
