const { Router } = require("express");
const {
  getComparisonController,
  getSingleComparisonController,
  getTopPopularComparisonController,
} = require("../../controller/comparison/comparison.controller");
const { baseRoute } = require("../../utils/constant");
const comparisonRouter = Router();

comparisonRouter.get(`${baseRoute}/get-comparisons`, getComparisonController);
comparisonRouter.get(
  `${baseRoute}/get-single-comparison/:identifier`,
  getSingleComparisonController
);
// get populer comparison
comparisonRouter.get(
  `${baseRoute}/get-top-comparison`,
  getTopPopularComparisonController
);

module.exports = comparisonRouter;
