const { Router } = require("express");
const {
  getSpecificationController,
} = require("../../controller/specification/specification.controller");
const { baseRoute } = require("../../utils/constant");
const specificationRouter = Router();

specificationRouter.get(
  `${baseRoute}/get-specifications`,
  getSpecificationController
);

module.exports = specificationRouter;
