const { Router } = require("express");
const {
  createBuyingGuideController,
  getAllBuyingGuideController,
  deleteBuyingGuideController,
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

// get all buying guide route
buyingGuideRouter.get(
  `${baseRoute}/get-buying-guides`,
  getAllBuyingGuideController
);

// delete buying guide route
buyingGuideRouter.delete(
  `${baseRoute}/delete-buying-guide/:id`,
  deleteBuyingGuideController
);

module.exports = buyingGuideRouter;
