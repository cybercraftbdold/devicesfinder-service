const { Router } = require("express");
const reviewRoute = require("./reviews-router/reviews.router");
const authRouter = require("./auth/auth.router");
const roleRouter = require("./role-manage-routes/role.manage.router");
const authenticationRouter = Router();
authenticationRouter.use(reviewRoute);
authenticationRouter.use(authRouter);
authenticationRouter.use(roleRouter);
module.exports = authenticationRouter;
