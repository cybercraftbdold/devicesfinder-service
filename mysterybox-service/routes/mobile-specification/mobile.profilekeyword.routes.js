const { Router } = require("express");
const {
  createMobileProfileKeywordController,
  getMobileProfileKeywordController,
  getMobileBlogKeywordController,
  createMobileBlogKeywordController,
} = require("../../controller/mobile-specifications/mobile.keyword.controller");
const mobileProfileKywordRoutes = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileProfileKywordRoutes.post(
  `${baseRoute}/create-mobile-profile-keyword`,
  createMobileProfileKeywordController
);
// get all profile keyword
mobileProfileKywordRoutes.get(
  `${baseRoute}/get-mobile-profile-keywords`,
  getMobileProfileKeywordController
);

// post route for create mobile specification prompt
mobileProfileKywordRoutes.post(
  `${baseRoute}/create-mobile-blog-keyword`,
  createMobileBlogKeywordController
);

// get all blogs keyword
mobileProfileKywordRoutes.get(
  `${baseRoute}/get-mobile-blog-keywords`,
  getMobileBlogKeywordController
);

module.exports = mobileProfileKywordRoutes;
