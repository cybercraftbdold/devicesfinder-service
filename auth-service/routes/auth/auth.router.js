const { Router } = require("express");
const {
  registrationController,
} = require("../../controller/auth/auth.controller");
const authRouter = Router();

authRouter.post("/auth/create-user", registrationController);
// reviewRoute.get("/review/get-review", getAllReviewsController);
module.exports = authRouter;
