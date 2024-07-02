const { Router } = require("express");
const { baseRoute } = require("../../utils/constant");
const {
  getCountOfCollectionsController,
} = require("../../controller/collection-statistics/collection-statistics.controller");

const collectionStatisticsRouter = Router();

collectionStatisticsRouter.get(
  `${baseRoute}/get-count-of-collections`,
  getCountOfCollectionsController
);

module.exports = collectionStatisticsRouter;
