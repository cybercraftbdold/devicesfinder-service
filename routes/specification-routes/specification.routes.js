const { Router } = require("express");
const {
  getSpecificationController,
  getSingleSpecificationController,
  getTopPopularSpecificationsController,
  createSpecificationController,
} = require("../../controller/specification/specification.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const specificationSchemaValidator = require("../../validators/specification.validator");
const specificationRouter = Router();

// create specification route
specificationRouter.post(
  `${baseRoute}/create-specifications`,
  requestValidator(specificationSchemaValidator),
  createSpecificationController
);

// get all specification route
specificationRouter.get(
  `${baseRoute}/get-specifications`,
  getSpecificationController
);

// get single specification route
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
