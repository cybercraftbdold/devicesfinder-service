const { Router } = require("express");
const {
  createMobileComparisonController,
  generateMobileComparisonController,
  getMobileComparisonController,
} = require("../../controller/mobile-specifications/mobile.comparison.contoller");
const mobileComparisonRouter = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile comparison
mobileComparisonRouter.post(
  `${baseRoute}/create-mobile-comparison`,
  createMobileComparisonController
);

// get all mobile comparison router
mobileComparisonRouter.get(
  `${baseRoute}/get-mobile-comparisons`,
  getMobileComparisonController
);
module.exports = mobileComparisonRouter;
