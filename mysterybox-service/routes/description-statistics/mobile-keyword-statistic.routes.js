const { Router } = require("express");
const {
  getKeywordCountController,
} = require("../../controller/description-statistics/mobile-keyword-statistic.contoller");

const mobileKeywordStatisticRouter = Router();
// base path
const baseRoute = "/mystery-box/statistic";

// get keyword counts
mobileKeywordStatisticRouter.get(
  `${baseRoute}/mobile-keyword-count`,
  getKeywordCountController
);
module.exports = mobileKeywordStatisticRouter;
