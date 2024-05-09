const { Router } = require("express");
const {
  registrationController,
  getAllUserController,
  loginController,
} = require("../../controller/auth/auth.controller");
const authEndpoint = require("../../endpoint/auth.endpoint");
const authRouter = Router();

authRouter.post("/auth/create-user", registrationController);
authRouter.get("/auth/get-users", getAllUserController);
authRouter.get("/auth/");
authRouter.post("/auth/login", loginController);

module.exports = authRouter;
