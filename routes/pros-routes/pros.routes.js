const { Router } = require("express");
const {
  createProsController,
} = require("../../controller/pros/pros.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const prosSchemaValidator = require("../../validators/pros.validator");

const prosRouter = Router();

// create buying guide route
prosRouter.post(
  `${baseRoute}/create-pros`,
  requestValidator(prosSchemaValidator),
  createProsController
);

module.exports = prosRouter;
