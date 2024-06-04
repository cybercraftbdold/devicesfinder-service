const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  getUserReviewsController,
  createUserReviewController,
  deleteUserReviewController,
} = require("../../controller/user-review/user-review.controller");
const userReviewRouter = Router();

userReviewRouter.get(`${baseRoute}/get-user-reviews`, getUserReviewsController);
userReviewRouter.post(
  `${baseRoute}/create-user-review`,
  createUserReviewController
);
userReviewRouter.delete(
  `${baseRoute}/delete-user-review/:id`,
  deleteUserReviewController
);
module.exports = userReviewRouter;
