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
} = require("../../controller/auth/auth.controller");
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

module.exports = authRouter;
