const { Router } = require("express");
const {
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
} = require("../../controller/auth/auth.controller");
const { verifyJWT } = require("../../middleware/verify-token");
const authRouter = Router();

authRouter.post("/auth/create-user", registrationController);
authRouter.get("/auth/get-users", getAllUserController);
authRouter.get("/auth/");
authRouter.post("/auth/login", loginController);
authRouter.get("/auth/generate-qrcode/:email", generateQRCodeController);
authRouter.post("/auth/verify-2fa", verifyUserController);
authRouter.post("/auth/registration-by-admin", registrationByAdminController);
authRouter.post("/auth/registration-by-user", selfRegistrationController);
authRouter.delete("/auth/delete-user/:id", deleteUserController);
authRouter.get("/auth/refresh-token", refreshTokenController);
authRouter.patch("/auth/restart-2fa/:email", restartToFAController);
authRouter.patch("/auth/update-user/:email", updateUserController);
authRouter.get("/auth/get-single-user/:email", getSingleUserController);
authRouter.post("/auth/change-password", verifyJWT, changePasswordController);

module.exports = authRouter;
