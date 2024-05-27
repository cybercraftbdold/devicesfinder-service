const { Router } = require("express");
const requestValidator = require("../../middleware/request-validator");
const {
  createMobileImageController,
  getMobileImageController,
  deleteMobileImageController,
} = require("../../controller/mobile-specifications/mobile.image.controller");
const {
  mobileImageSchema,
} = require("../../validators/mobile-specification/image.validator");
const mobileImageRoute = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileImageRoute.post(
  `${baseRoute}/create-mobile-image`,
  requestValidator(mobileImageSchema),
  createMobileImageController
);
// get all image
mobileImageRoute.get(
  `${baseRoute}/get-mobile-images`,
  getMobileImageController
);
// delete image
mobileImageRoute.delete(
  `${baseRoute}/delete-mobile-image/:id`,
  deleteMobileImageController
);

module.exports = mobileImageRoute;
