const { Router } = require("express");
const {
  createMobileBuyingGuideController,
  generateMobileBuyingGuideController,
  getMobileBuyingGuideController,
} = require("../../controller/mobile-specifications/mobile.buying-guide.contoller");

const mobileBuyingGuideRouter = Router();
// base path
const baseRoute = "/mystery-box";

// generate mobile buying-guide router
mobileBuyingGuideRouter.post(
  `${baseRoute}/generate-mobile-buying-guide`,
  generateMobileBuyingGuideController
);
// post route for create mobile buying-guide
mobileBuyingGuideRouter.post(
  `${baseRoute}/create-mobile-buying-guide`,
  createMobileBuyingGuideController
);

// get all mobile buying-guide router
mobileBuyingGuideRouter.get(
  `${baseRoute}/get-mobile-buying-guides`,
  getMobileBuyingGuideController
);
module.exports = mobileBuyingGuideRouter;
