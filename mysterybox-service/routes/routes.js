const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const promptMobileRouter = require("./ai-integration/mobile-specification/prompt.mobile.routes");
const mobileSpecificationRouter = require("./mobile-specification/mobile.specification.routes");
const mobileProfileKywordRoutes = require("./mobile-specification/mobile.profilekeyword.routes");
const mobileFaqRouter = require("./mobile-specification/mobile.faq.routes");
const mobileUserReviewRouter = require("./mobile-specification/mobile.user-review.routes");
const mobileKeywordStatisticRouter = require("./description-statistics/mobile-keyword-statistic.routes");
const mobileBuyingGuideRouter = require("./mobile-specification/mobile.Buying-guide.routes");
const mysteryboxRouter = Router();
mysteryboxRouter.use(reviewRouter);
mysteryboxRouter.use(promptMobileRouter);
mysteryboxRouter.use(mobileSpecificationRouter);
mysteryboxRouter.use(mobileProfileKywordRoutes);
mysteryboxRouter.use(mobileFaqRouter);
mysteryboxRouter.use(mobileUserReviewRouter);
mysteryboxRouter.use(mobileBuyingGuideRouter);
// description statistics
mysteryboxRouter.use(mobileKeywordStatisticRouter);

module.exports = mysteryboxRouter;
