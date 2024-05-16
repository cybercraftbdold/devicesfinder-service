const { Router } = require("express");
const {
  createMobileProfileKeywordController,
} = require("../../controller/mobile-specifications/mobile.keyword.controller");
const {
  createMobileBlogKeywordController,
} = require("../../controller/mobile-specifications/mobile.specification.contoller");

const mobileProfileKywordRoutes = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileProfileKywordRoutes.post(
  `${baseRoute}/create-mobile-profile-keyword`,
  createMobileProfileKeywordController
);
// post route for create mobile specification prompt
mobileProfileKywordRoutes.post(
  `${baseRoute}/create-mobile-blog-keyword`,
  createMobileBlogKeywordController
);

module.exports = mobileProfileKywordRoutes;
