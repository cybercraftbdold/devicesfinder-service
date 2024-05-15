const { Router } = require("express");
const reviewRoute = require("./reviews-router/reviews.router");
const androidRouter = Router();
androidRouter.use(reviewRoute);
module.exports = androidRouter;
