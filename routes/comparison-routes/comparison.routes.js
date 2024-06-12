const { Router } = require("express");
const {
  getComparisonController,
  getSingleComparisonController,
  getTopPopularComparisonController,
  compareMobilesController,
  createComparisonController,
} = require("../../controller/comparison/comparison.controller");
const { baseRoute } = require("../../utils/constant");
const comparisonRouter = Router();

comparisonRouter.post(
  `${baseRoute}/create-comparison`,
  createComparisonController
);
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
//  compare mobiles comparison
comparisonRouter.get(
  `${baseRoute}/compare-mobile-comparison/:id`,
  compareMobilesController
);

module.exports = comparisonRouter;