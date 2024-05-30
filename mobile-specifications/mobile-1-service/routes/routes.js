const { Router } = require("express");
const specificationRouter = require("./specification-routes/specification.routes");
const comparisonRouter = require("./comparison-routes/comparison.routes");
const userReviewRouter = require("./user-review-routes/user-review.routes");
const mobileSpecification = Router();
mobileSpecification.use(userReviewRouter);
mobileSpecification.use(specificationRouter);
mobileSpecification.use(comparisonRouter);
module.exports = mobileSpecification;
