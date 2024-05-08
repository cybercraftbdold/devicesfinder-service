const { Router } = require("express");
const reviewRoute = require("./reviews-router/reviews.router");
const authRouter = require("./auth/auth.router");
const authenticationRouter = Router();
authenticationRouter.use(reviewRoute);
authenticationRouter.use(authRouter);
module.exports = authenticationRouter;
