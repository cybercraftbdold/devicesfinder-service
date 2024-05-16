const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const promptMobileRouter = require("./ai-integration/mobile-specification/prompt.mobile.routes");
const mysteryboxRouter = Router();
mysteryboxRouter.use(reviewRouter);
mysteryboxRouter.use(promptMobileRouter);
module.exports = mysteryboxRouter;
