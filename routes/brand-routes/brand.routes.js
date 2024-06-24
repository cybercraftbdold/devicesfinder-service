const { Router } = require("express");
const {
  createBrandController,
  getAllBrandsController,
  updateBrandController,
  deleteBrandController,
  getSingleBrandController,
} = require("../../controller/brand/brand.controller");
const { baseRoute } = require("../../utils/constant");
const brandSchemaValidator = require("../../validators/brand.validator");
const requestValidator = require("../../middleware/request-validator");

const brandRouter = Router();

brandRouter.post(
  `${baseRoute}/create-brand`,
  requestValidator(brandSchemaValidator),
  createBrandController
);
brandRouter.get(`${baseRoute}/get-brands`, getAllBrandsController);
brandRouter.get(`${baseRoute}/get-brand/:id`, getSingleBrandController);
brandRouter.patch(`${baseRoute}/update-brand/:id`, updateBrandController);
brandRouter.delete(`${baseRoute}/delete-brand/:id`, deleteBrandController);

module.exports = brandRouter;
