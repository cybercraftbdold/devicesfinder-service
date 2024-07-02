const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  getUserReviewsController,
  getSingleUserReviewController,
  createUserReviewController,
  deleteUserReviewController,
  updateUserReviewController,
} = require("../../controller/user-review/user-review.controller");
const requestValidator = require("../../middleware/request-validator");
const userReviewSchemaValidator = require("../../validators/user-review.validator");
const userReviewRouter = Router();

userReviewRouter.get(`${baseRoute}/get-user-reviews`, getUserReviewsController);
userReviewRouter.get(
  `${baseRoute}/get-single-user-review/:id`,
  getSingleUserReviewController
);
userReviewRouter.post(
  `${baseRoute}/create-user-review`,
  requestValidator(userReviewSchemaValidator),
  createUserReviewController
);
userReviewRouter.patch(
  `${baseRoute}/update-user-review/:id`,
  updateUserReviewController
);
userReviewRouter.delete(
  `${baseRoute}/delete-user-review/:id`,
  deleteUserReviewController
);
module.exports = userReviewRouter;
