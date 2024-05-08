const { Router } = require("express");
const {
  registrationController,
  getAllUserController,
} = require("../../controller/auth/auth.controller");
const authRouter = Router();

authRouter.post("/auth/create-user", registrationController);
authRouter.get("/auth/get-users", getAllUserController);
module.exports = authRouter;
