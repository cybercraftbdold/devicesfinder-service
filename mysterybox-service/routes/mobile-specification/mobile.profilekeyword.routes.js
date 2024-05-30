const { Router } = require("express");
const {
  createMobileProfileKeywordController,
  getMobileProfileKeywordController,
  getMobileBlogKeywordController,
  createMobileBlogKeywordController,
  deleteMobileProfileKeywordController,
  updateProfileKeywordController,
} = require("../../controller/mobile-specifications/mobile.keyword.controller");
const requestValidator = require("../../middleware/request-validator");
const {
  mobileBlogKeywordSchema,
  mobileProfileKeywordSchema,
} = require("../../validators/mobile-specification/mobile-keyword-validator/mobile-keyword.validator");
const mobileProfileKywordRoutes = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
mobileProfileKywordRoutes.post(
  `${baseRoute}/create-mobile-profile-keyword`,
  requestValidator(mobileProfileKeywordSchema),
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
  requestValidator(mobileBlogKeywordSchema),
  createMobileBlogKeywordController
);

// get all blogs keyword
mobileProfileKywordRoutes.get(
  `${baseRoute}/get-mobile-blog-keywords`,
  getMobileBlogKeywordController
);

// delete mobile profile keyword
mobileProfileKywordRoutes.delete(
  `${baseRoute}/delete-mobile-profile-keyword/:id`,
  deleteMobileProfileKeywordController
);
// updste profile keyword
mobileProfileKywordRoutes.patch(
  `${baseRoute}/update-mobile-profile-keyword/:id`,
  updateProfileKeywordController
);

module.exports = mobileProfileKywordRoutes;
