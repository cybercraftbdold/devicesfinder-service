const { Router } = require("express");
const {
  createReviewsController,
  getAllReviewsController,
} = require("../../controller/news-reviews/news.reviews");
const reviewRoute = Router();

reviewRoute.post("/review/create-review", createReviewsController);
reviewRoute.get("/review/get-review", getAllReviewsController);
module.exports = reviewRoute;
