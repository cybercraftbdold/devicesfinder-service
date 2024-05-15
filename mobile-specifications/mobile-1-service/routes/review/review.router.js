const { Router } = require("express");
const { getAllReviewController, createReviewController } = require("../../controller/review/review.controller");
const reviewRouter = Router();

reviewRouter.post("/mobile/create-review", createReviewController);
reviewRouter.get("/mobile/get-reviews", getAllReviewController);

module.exports = reviewRouter;
