const { Router } = require("express");
const {
  createMobileProfileKeywordController,
} = require("../../controller/mobile-specifications/mobile.keyword.controller");

const mobileProfileKywordRoutes = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileProfileKywordRoutes.post(
  `${baseRoute}/create-mobile-keyword`,
  createMobileProfileKeywordController
);

module.exports = mobileProfileKywordRoutes;
