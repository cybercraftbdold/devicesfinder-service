const { Router } = require("express");
const {
  createBrandController,
  getAllBrandsController,
} = require("../../controller/brand/brand.controller");
const { baseRoute } = require("../../utils/constant");
const { brandValidator } = require("../../validators/brand.validator");
const requestValidator = require("../../middleware/request-validator");

const brandRouter = Router();

brandRouter.post(
  `${baseRoute}/create-brand`,
  requestValidator(brandValidator),
  createBrandController
);
brandRouter.get(`${baseRoute}/get-brands`, getAllBrandsController);

module.exports = brandRouter;
