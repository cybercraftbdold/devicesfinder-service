const { Router } = require("express");
const {
  getSpecificationController,
  getSingleSpecificationController,
  getTopPopularSpecificationsController,
  createSpecificationController,
  getSingleSpecificationByDeviceIdController,
  getUsedUniqueTypsController,
  getSpecificationByPropartyController,
} = require("../../controller/specification/specification.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const specificationSchemaValidator = require("../../validators/specification.validator");
const specificationRouter = Router();

// create specification route
specificationRouter.post(
  `${baseRoute}/create-specification`,
  requestValidator(specificationSchemaValidator),
  createSpecificationController
);

//get specification by proparty
specificationRouter.get(
  `${baseRoute}/get-specification-by-proparty`,
  getSpecificationByPropartyController
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

// get single specification by device id route
specificationRouter.get(
  `${baseRoute}/get-single-specification-by-deviceId/:deviceId`,
  getSingleSpecificationByDeviceIdController
);

// get top view populer specification
specificationRouter.get(
  `${baseRoute}/get-top-specification`,
  getTopPopularSpecificationsController
);
// get top view populer specification
specificationRouter.get(
  `${baseRoute}/get-unique-types`,
  getUsedUniqueTypsController
);

module.exports = specificationRouter;
