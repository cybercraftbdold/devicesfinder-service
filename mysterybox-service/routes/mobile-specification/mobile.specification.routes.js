const { Router } = require("express");
const {
  createMobileSpecificationController,
  generateMobileSpecificationController,
  getMobileSpecificationController,
  updateMobileStatusController,
  deleteMobileSpecificationController,
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
// get all mobile specification router
mobileSpecificationRouter.get(
  `${baseRoute}/get-mobile-specifications`,
  getMobileSpecificationController
);
// update mobile specification status
mobileSpecificationRouter.patch(
  `${baseRoute}/update-status-mobile-specification/:id`,
  updateMobileStatusController
);
// delete mobile specification
mobileSpecificationRouter.delete(
  `${baseRoute}/delete-mobile-specification/:id`,
  deleteMobileSpecificationController
);
module.exports = mobileSpecificationRouter;
