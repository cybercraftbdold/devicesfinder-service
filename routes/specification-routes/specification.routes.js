const { Router } = require("express");
const {
  getSpecificationController,
  getSingleSpecificationController,
  getTopPopularSpecificationsController,
} = require("../../controller/specification/specification.controller");
const { baseRoute } = require("../../utils/constant");
const specificationRouter = Router();

specificationRouter.get(
  `${baseRoute}/get-specifications`,
  getSpecificationController
);
specificationRouter.get(
  `${baseRoute}/get-single-specification/:identifier`,
  getSingleSpecificationController
);

// get top view populer specification
specificationRouter.get(
  `${baseRoute}/get-top-specification`,
  getTopPopularSpecificationsController
);

module.exports = specificationRouter;
