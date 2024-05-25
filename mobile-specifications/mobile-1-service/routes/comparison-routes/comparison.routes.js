const { Router } = require("express");
const {
  getComparisonController,
  getSingleComparisonController,
} = require("../../controller/comparison/comparison.controller");
const { baseRoute } = require("../../utils/constant");
const comparisonRouter = Router();

comparisonRouter.get(`${baseRoute}/get-comparisons`, getComparisonController);
comparisonRouter.get(
  `${baseRoute}/get-single-comparison/:identifier`,
  getSingleComparisonController
);

module.exports = comparisonRouter;
