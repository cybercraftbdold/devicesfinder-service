const { Router } = require("express");
const specificationRouter = require("./specification-routes/specification.routes");
const comparisonRouter = require("./comparison-routes/comparison.routes");
const userReviewRouter = require("./user-review-routes/user-review.routes");
const brandRouter = require("./brand-routes/brand.routes");
const blogRouter = require("./blog-routes/blog.routes");
const deviceReviewRouter = require("./device-review-routes/device-review.routes");
const buyingGuideRouter = require("./buying-guide-routes/buying-guide.routes");
const faqRouter = require("./faq-routes/faq.routes");
const prosRouter = require("./pros-routes/pros.routes");
const consRouter = require("./cons-routes/cons.routes");
const collectionStatisticsRouter = require("./collection-statistics/collection-statistics.routes");
const mailSendRouter = require("./email-management/mail.send.routes");

const deviceFinderRoute = Router();

deviceFinderRoute.use(userReviewRouter);
deviceFinderRoute.use(specificationRouter);
deviceFinderRoute.use(comparisonRouter);
deviceFinderRoute.use(brandRouter);
deviceFinderRoute.use(blogRouter);
deviceFinderRoute.use(deviceReviewRouter);
deviceFinderRoute.use(buyingGuideRouter);
deviceFinderRoute.use(faqRouter);
deviceFinderRoute.use(prosRouter);
deviceFinderRoute.use(consRouter);
deviceFinderRoute.use(collectionStatisticsRouter);
deviceFinderRoute.use(mailSendRouter);

module.exports = deviceFinderRoute;
