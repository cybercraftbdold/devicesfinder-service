const { Router } = require("express");
const {
  createMobileReviewController,
  generateMobileReviewController,
  getMobileReviewController,
  deleteMobileReviewController,
} = require("../../controller/mobile-specifications/mobile.review.contoller");
const mobileReviewRouter = Router();
// base path
const baseRoute = "/mystery-box";

// generate mobile review router
mobileReviewRouter.post(
  `${baseRoute}/generate-mobile-review`,
  generateMobileReviewController
);
// post route for create mobile review
mobileReviewRouter.post(
  `${baseRoute}/create-mobile-review`,
  createMobileReviewController
);

// get all mobile review router
mobileReviewRouter.get(
  `${baseRoute}/get-mobile-reviews`,
  getMobileReviewController
);
// delete mobile review
mobileReviewRouter.delete(
  `${baseRoute}/delete-mobile-review/:id`,
  deleteMobileReviewController
);
module.exports = mobileReviewRouter;
