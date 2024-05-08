const UserModel = require("../../models/auth-model/auth.model");

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

// get all users

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

module.exports = {
  registerService,
  getAllUserService
};
