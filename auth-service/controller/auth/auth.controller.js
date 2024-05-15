const {
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
} = require("../../services/auth/auth.service");
const envConfig = require("../../utils/env.config");

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

// login controller
const loginController = async (req, res, next) => {
  try {
    const loginData = req.body;
    const result = await loginService(loginData);
    const { refreshToken, ...others } = result;
    // Set refresh token in cookie
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false });
    // delete refreshToken
    if ("refreshToken" in result) {
      delete result.refreshToken;
    }
    if (result?.accessToken) {
      res.json({
        message: "logged in successfully",
        status_code: 200,
        isSuccess: true,
        data: others,
      });
    } else if (result?.isSuccess === false) {
      res.json({
        message: result.message,
        status_code: result.status_code,
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      isSuccess: false,
    });
  }
};
// generate qr code controller for TOFA
const generateQRCodeController = async (req, res, next) => {
  try {
    // Extract user email from request parameters
    const userEmail = req?.params?.email;
    // Call the AuthService to generate QR code
    const result = await generateQRCodeService(userEmail);
    // Check if QR code generation is successful
    if (result?.qrcode) {
      // If QR code is generated successfully
      return res.status(200).json({
        message: "QR code generated successfully",
        status_code: 200,
        data: result,
      });
    } else {
      // If two-factor authentication is already enabled
      return res.status(400).json({
        message: "Two-factor authentication is already enabled for this user",
        status_code: 400,
      });
    }
  } catch (error) {
    // If any error occurs during QR code generation, pass it to the error handling middleware
    next(error);
  }
};
// verify two factor authentication
const verifyUserController = async (req, res, next) => {
  try {
    const payload = {
      token: req?.body?.token,
      email: req?.body?.email,
    };
    const result = await verifyUserService(payload);
    if (result.success === true) {
      res.json({
        success: "true",
        status_code: 200,
        data: result,
      });
    } else if (result.success === false) {
      res.json({
        success: "false",
        status_code: 400,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
// registration by admin  using invited link
const registrationByAdminController = async (req, res, next) => {
  try {
    const result = await registrationByAdminService(req.body);
    res.json({
      message: result.message,
      Invitedlink: result.Invitedlink,
      emailResult: result.emailResult,
      status_code: result.isSuccess ? 200 : 400,
    });
  } catch (error) {
    next(error);
  }
};
// self registration controller
const selfRegistrationController = async (req, res, next) => {
  try {
    const result = await selfRegistrationService(req.body);
    // Prepare response based on the result from the service
    if (result.success === true) {
      res.json({
        message: result.message,
        status_code: 200,
      });
    } else {
      res.json({
        message: result.message,
        status_code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};
// user delete controller
const deleteUserController = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleteUserService(id);
    res.json({
      message: result.message,
      status_code: result.isSuccess ? 200 : 400,
    });
  } catch (error) {
    next(error);
  }
};
// refresh token controller
const refreshTokenController = async (req, res, next) => {
  try {
    // Retrieve refreshToken from the request cookies
    const refreshToken = req.cookies?.refreshToken;
    // Check if refreshToken exists
    if (!refreshToken) {
      return res.status(400).json({
        message: "No refreshToken found in cookies",
        status_code: 400,
      });
    }
    const result = await refreshTokenService(refreshToken);
    // Set cookie options
    const cookieOptions = {
      secure: false, // Change to true if your application uses HTTPS
      httpOnly: true,
    };

    // Set the refreshToken cookie in the response
    res.cookie("refreshToken", refreshToken, cookieOptions);

    // Check if accessToken exists in the result
    if (result.accessToken) {
      // Send success response
      res.json({
        message: result,
        status_code: 200,
      });
    } else {
      // Send error response
      res.json({
        message: result,
        status_code: 400,
      });
    }
  } catch (error) {
    // Forward error to the error handling middleware
    next(error);
  }
};
// Restart to factor authentication
const restartToFAController = async (req, res) => {
  try {
    const email = req.params.email; // Assuming the user's ID is passed as a URL parameter
    const { twoFactorEnabled } = req.body; // Expecting 'twoFactorEnabled' to be provided in the request body
    // Validate the input to ensure it is a boolean
    if (typeof twoFactorEnabled !== "boolean") {
      return res.status(400).json({
        message: "Invalid request. 'twoFactorEnabled' must be a boolean value.",
        isSuccess: false,
      });
    }

    const result = await restartToFAService(email, twoFactorEnabled);

    if (result?.isSuccess) {
      res.status(200).json({
        message: result.message,
        isSuccess: result.isSuccess,
        response: result.response,
      });
    } else {
      res.status(400).json({
        message: result.message,
        isSuccess: result.isSuccess,
        response: result.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};
//Update User Controller
const updateUserController = async (req, res, next) => {
  try {
    const payload = {
      body: req.body,
      params: req.params,
    };
    const result = await updateUserService(payload);

    if ("data" in result && result.data && "toObject" in result.data) {
      const userObject = result.data.toObject();
      // Destructure the object to omit password and secretKey
      const { password, secretKey, ...safeUserData } = userObject;
      // Return the safe user data
      res.json({
        message: result.message,
        status_code: 200,
        data: result.data ? { safeUserData } : {},
      });
    } else {
      res.json({
        message: result.message,
        status_code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getSingleUserController = async (req, res, next) => {
  try {
    const email = req?.params?.email;
    const result = await getSingleService(email);

    if (result?.success) {
      res.json({
        message: result.message,
        status_code: 200,
        data: result,
      });
    } else {
      res.json({
        message: result.message,
        status_code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};
// password change controller
const changePasswordController = async (req, res, next) => {
  try {
    const user = req.decoded;
    const payload = req.body;
    const result = await changePasswordService(user, payload);
    if (result.success === true) {
      res.json({
        message: result.message,
        status_code: result.success,
      });
    } else {
      res.json({
        message: result.message,
        status_code: result.success,
      });
    }
  } catch (error) {
    next(error);
  }
};
// forgot password controller
const forgotPasswordController = async (req, res) => {
  try {
    const email = req.params.email;
    const result = await forgotPasswordService(email);
    if (result && result.accepted && result.accepted.length > 0) {
      // Email sent successfully
      res.status(200).json({
        message: "Email sent successfully.",
        isSuccess: true,
      });
    } else {
      // Email failed to send
      res.status(400).json({
        message: "User Not Exist!.",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Failed to send email.",
      isSuccess: false,
    });
  }
};
// reset password after forgot
const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const payload = {
      token,
      newPassword,
    };
    const result = await resetPasswordService(payload);
    if (result.success) {
      res.json({
        message: result.message,
        status_code: 200,
      });
    } else {
      res.json({
        message: result.message,
        status_code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registrationController,
  getAllUserController,
  loginController,
  generateQRCodeController,
  verifyUserController,
  registrationByAdminController,
  selfRegistrationController,
  deleteUserController,
  refreshTokenController,
  restartToFAController,
  updateUserController,
  getSingleUserController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
};
