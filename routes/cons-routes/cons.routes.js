const { Router } = require("express");
const {
  createConsController,
} = require("../../controller/cons/cons.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const consSchemaValidator = require("../../validators/cons.validator");

const consRouter = Router();

// create cons route
consRouter.post(
  `${baseRoute}/create-cons`,
  requestValidator(consSchemaValidator),
  createConsController
);

module.exports = consRouter;
