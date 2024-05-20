const { Router } = require("express");
const {
  createMobileUserReviewController,
  generateMobilUserReviewController,
  getMobileUserReviewController,
} = require("../../controller/mobile-specifications/mobile.user-review.contoller");

const mobileUserReviewRouter = Router();
// base path
const baseRoute = "/mystery-box";

// generate mobile user-review router
mobileUserReviewRouter.post(
  `${baseRoute}/generate-mobile-user-review`,
  generateMobilUserReviewController
);
// post route for create mobile user-review
mobileUserReviewRouter.post(
  `${baseRoute}/create-mobile-user-review`,
  createMobileUserReviewController
);

// get all mobile user-review router
mobileUserReviewRouter.get(
  `${baseRoute}/get-mobile-user-reviews`,
  getMobileUserReviewController
);
module.exports = mobileUserReviewRouter;