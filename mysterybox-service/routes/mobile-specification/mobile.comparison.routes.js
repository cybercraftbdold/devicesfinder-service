const { Router } = require("express");
const {
  createMobileComparisonController,
  generateMobileComparisonController,
  getMobileComparisonController,
  deleteMobileComparisonController,
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
// delete mobile comparison
mobileComparisonRouter.delete(
  `${baseRoute}/delete-mobile-comparison/:id`,
  deleteMobileComparisonController
);
module.exports = mobileComparisonRouter;
