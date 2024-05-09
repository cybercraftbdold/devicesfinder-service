const { createToken } = require("../../helpers/jwtHelpers");
const UserModel = require("../../models/auth-model/auth.model");
const speakeasy = require("speakeasy");

const envConfig = require("../../utils/env.config");
const generateQRCodeImage = require("../../helpers/qrcode.helpers");

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

    const companyName = "Nusaiba Construction & Technology";
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

module.exports = {
  registerService,
  getAllUserService,
  loginService,
  generateQRCodeService,
  verifyUserService,
};
