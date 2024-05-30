const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const { getUserReviewsController } = require("../../controller/user-review/user-review.controller");
const userReviewRouter = Router();

userReviewRouter.get(`${baseRoute}/get-user-reviews`, getUserReviewsController);
module.exports = userReviewRouter;
