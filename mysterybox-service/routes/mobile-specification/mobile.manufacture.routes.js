const { Router } = require("express");
const requestValidator = require("../../middleware/request-validator");
const {
  createMobileManufactureController,
  getMobileManufactureController,
} = require("../../controller/mobile-specifications/mobile.manufacture.controller");
const {
  mobileManufactureSchema,
} = require("../../validators/mobile-specification/manufacture.validator");
const mobileManufactureRoute = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileManufactureRoute.post(
  `${baseRoute}/create-mobile-manufacture`,
  requestValidator(mobileManufactureSchema),
  createMobileManufactureController
);
// get all profile keyword
mobileManufactureRoute.get(
  `${baseRoute}/get-mobile-manufactures`,
  getMobileManufactureController
);

module.exports = mobileManufactureRoute;
