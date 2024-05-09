const { Router } = require("express");
const {
  registrationController,
  getAllUserController,
  loginController,
  generateQRCodeController,
  verifyUserController,
} = require("../../controller/auth/auth.controller");
const authEndpoint = require("../../endpoint/auth.endpoint");
const authRouter = Router();

authRouter.post("/auth/create-user", registrationController);
authRouter.get("/auth/get-users", getAllUserController);
authRouter.get("/auth/");
authRouter.post("/auth/login", loginController);
authRouter.get("/auth/generate-qrcode/:email", generateQRCodeController);
authRouter.post("/auth/verify-2fa", verifyUserController);

module.exports = authRouter;
