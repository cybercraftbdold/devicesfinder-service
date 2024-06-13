const { Router } = require("express");
const specificationRouter = require("./specification-routes/specification.routes");
const comparisonRouter = require("./comparison-routes/comparison.routes");
const userReviewRouter = require("./user-review-routes/user-review.routes");
const brandRouter = require("./brand-routes/brand.routes");
const blogRouter = require("./blog-routes/blog.routes");
const deviceReviewRouter = require("./device-review-routes/device-review.routes");
const buyingGuideRouter = require("./buying-guide-routes/buying-guide.routes");

const mobileSpecification = Router();

mobileSpecification.use(userReviewRouter);
mobileSpecification.use(specificationRouter);
mobileSpecification.use(comparisonRouter);
mobileSpecification.use(brandRouter);
mobileSpecification.use(blogRouter);
mobileSpecification.use(deviceReviewRouter);
mobileSpecification.use(buyingGuideRouter);

module.exports = mobileSpecification;
