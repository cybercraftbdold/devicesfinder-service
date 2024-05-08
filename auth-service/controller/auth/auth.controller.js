const {
  registerService,
  getAllUserService,
} = require("../../services/auth/auth.service");

// create user
const registrationController = async (req, res, next) => {
  try {
    const result = await registerService(req.body);
    // Prepare response based on the result from the service
    res.json({
      message: result.message,
      status_code: result.isSuccess ? 200 : 400,
      data: result.user ? { user: result.user } : {},
    });
  } catch (error) {
    next(error);
  }
};

// get all user controller
const getAllUserController = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchText = req.query.searchText || "";
  const role = req.query.role || "";
  try {
    const result = await getAllUserService(limit, skip, searchText, {
      role,
    });
    if (result.isSuccess) {
      res.status(200).json({
        message: "Users fetched successfully",
        data: result.users,
        totalUsers: result.totalUsers,
        page,
        limit,
      });
    } else {
      res.status(404).json({
        message: result.message || "No users found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  getAllUserController,
};
