const { Router } = require("express");
const requestValidator = require("../../middleware/request-validator");
const {
  createMobileManufactureController,
  getMobileManufactureController,
  deleteMobileManufactureController,
  updateManufactureController,
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
// get all manufacture
mobileManufactureRoute.get(
  `${baseRoute}/get-mobile-manufactures`,
  getMobileManufactureController
);
// delete manufacture
mobileManufactureRoute.delete(
  `${baseRoute}/delete-mobile-manufacture/:id`,
  deleteMobileManufactureController
);
// update  manufacture
mobileManufactureRoute.patch(
  `${baseRoute}/update-mobile-manufacture/:id`,
  updateManufactureController
);

module.exports = mobileManufactureRoute;
