const { Router } = require("express");
const {
  createBuyingGuideController,
} = require("../../controller/buying-guide/buying-guide.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const buyingGuideSchemaValidator = require("../../validators/buying-guide.validator");

const buyingGuideRouter = Router();

// create buying guide route
buyingGuideRouter.post(
  `${baseRoute}/create-buying-guide`,
  requestValidator(buyingGuideSchemaValidator),
  createBuyingGuideController
);

module.exports = buyingGuideRouter;
