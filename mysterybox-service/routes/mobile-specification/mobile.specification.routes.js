const { Router } = require("express");
const {
  createMobileSpecificationController,
} = require("../../controller/mobile-specifications/mobile.specification.contoller");

const mobileSpecificationRouter = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileSpecificationRouter.post(
  `${baseRoute}/create-mobile-specification`,
  createMobileSpecificationController
);

module.exports = mobileSpecificationRouter;
