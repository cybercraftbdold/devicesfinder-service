const { Router } = require("express");
const {
  createConsController,
  getAllConsController,
  deleteConsController,
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

//delete cons route
consRouter.delete(`${baseRoute}/delete-mobile-cons/:id`, deleteConsController);

module.exports = consRouter;
