const { Router } = require("express");
const {
  getSpecificationController,
  getSingleSpecificationController,
} = require("../../controller/specification/specification.controller");
const { baseRoute } = require("../../utils/constant");
const specificationRouter = Router();

specificationRouter.get(
  `${baseRoute}/get-specifications`,
  getSpecificationController
);
specificationRouter.get(
  `${baseRoute}/get-single-specification/:id`,
  getSingleSpecificationController
);

module.exports = specificationRouter;
