const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const mobileSpecification = Router();
mobileSpecification.use(reviewRouter);
module.exports = mobileSpecification;
