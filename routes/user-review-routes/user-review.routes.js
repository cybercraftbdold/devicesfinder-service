const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  getUserReviewsController,
  createUserReviewController,
  deleteUserReviewController,
} = require("../../controller/user-review/user-review.controller");
const requestValidator = require("../../middleware/request-validator");
const userReviewSchemaValidator = require("../../validators/user-review.validator");
const userReviewRouter = Router();

userReviewRouter.get(`${baseRoute}/get-user-reviews`, getUserReviewsController);
userReviewRouter.post(
  `${baseRoute}/create-user-review`,
  requestValidator(userReviewSchemaValidator),
  createUserReviewController
);
userReviewRouter.delete(
  `${baseRoute}/delete-user-review/:id`,
  deleteUserReviewController
);
module.exports = userReviewRouter;
