const { Router } = require("express");
const {
  createReviewsController,
} = require("../../controller/news-reviews/news.reviews");
const reviewRoute = Router();

reviewRoute.post("/review/create-review", createReviewsController);
module.exports = reviewRoute;
