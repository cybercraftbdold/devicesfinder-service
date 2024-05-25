const { Router } = require("express");
const reviewRouter = require("./review/review.router");
const specificationRouter = require("./specification-routes/specification.routes");
const mobileSpecification = Router();
mobileSpecification.use(reviewRouter);
mobileSpecification.use(specificationRouter);
module.exports = mobileSpecification;
