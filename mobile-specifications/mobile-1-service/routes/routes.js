const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const specificationRouter = require("./specification-routes/specification.routes");
const comparisonRouter = require("./comparison-routes/comparison.routes");
const mobileSpecification = Router();
mobileSpecification.use(reviewRouter);
mobileSpecification.use(specificationRouter);
mobileSpecification.use(comparisonRouter);
module.exports = mobileSpecification;
