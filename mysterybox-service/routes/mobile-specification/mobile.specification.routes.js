const { Router } = require("express");
const {
  createMobileSpecificationController,
  generateMobileSpecificationController,
} = require("../../controller/mobile-specifications/mobile.specification.contoller");
const mobileSpecificationRouter = Router();
// base path
const baseRoute = "/mystery-box";

// generate mobile specification router
mobileSpecificationRouter.post(
  `${baseRoute}/generate-mobile-specification`,
  generateMobileSpecificationController
);
// post route for create mobile specification prompt
mobileSpecificationRouter.post(
  `${baseRoute}/create-mobile-specification`,
  createMobileSpecificationController
);

module.exports = mobileSpecificationRouter;
