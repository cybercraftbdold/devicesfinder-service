const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const promptMobileRouter = require("./ai-integration/mobile-specification/prompt.mobile.routes");
const mobileSpecificationRouter = require("./mobile-specification/mobile.specification.routes");
const mysteryboxRouter = Router();
mysteryboxRouter.use(reviewRouter);
mysteryboxRouter.use(promptMobileRouter);
mysteryboxRouter.use(mobileSpecificationRouter);
module.exports = mysteryboxRouter;
