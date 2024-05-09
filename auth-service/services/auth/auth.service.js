const { createToken } = require("../../helpers/jwtHelpers");
const UserModel = require("../../models/auth-model/auth.model");
const envConfig = require("../../utils/env.config");

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
//=========================== Get All User Service ===================
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

module.exports = {
  registerService,
  getAllUserService,
  loginService,
};
