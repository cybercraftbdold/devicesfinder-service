const { Router } = require("express");
const {
  getAllReviewController,
  createReviewController,
} = require("../../controller/review/review.controller");
const reviewRouter = Router();

reviewRouter.post("/mystery-box/create-review", createReviewController);
reviewRouter.get("/mystery-box/get-reviews", getAllReviewController);

module.exports = reviewRouter;
