const { Router } = require("express");
const {
  createMobileGptPromptController,
  getMobileGptPromptController,
  updateMobileGptPromptController,
} = require("../../../controller/ai-integrations/mobile-specification/prompt.mobile.controller");

const promptMobileRouter = Router();
// base path
const baseRoute = "/mystery-box";

// post route for create mobile specification prompt
promptMobileRouter.post(
  `${baseRoute}/create-mobile-prompt`,
  createMobileGptPromptController
);
// get route for get mobile specification prompt
promptMobileRouter.get(
  `${baseRoute}/get-mobile-prompt`,
  getMobileGptPromptController
);

// patch route for update mobile specification prompt
promptMobileRouter.patch(
  `${baseRoute}/update-mobile-prompt/:id`,
  updateMobileGptPromptController
);

module.exports = promptMobileRouter;
