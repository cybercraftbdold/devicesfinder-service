const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const mysteryboxRouter = Router();
mysteryboxRouter.use(reviewRouter);
module.exports = mysteryboxRouter;
