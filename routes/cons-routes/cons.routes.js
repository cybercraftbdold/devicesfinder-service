const { Router } = require("express");
const {
  createConsController,
  getAllConsController,
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

// get all cons route
consRouter.get(`${baseRoute}/get-cons`, getAllConsController);

module.exports = consRouter;
