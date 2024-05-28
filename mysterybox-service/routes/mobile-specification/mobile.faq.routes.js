const { Router } = require("express");
const {
  createMobileFaqController,
  generateMobileFaqController,
  getMobileFaqController,
  deleteMobileFaqController,
} = require("../../controller/mobile-specifications/mobile.faq.contoller");

const mobileFaqRouter = Router();
// base path
const baseRoute = "/mystery-box";

// generate mobile faq router
mobileFaqRouter.post(
  `${baseRoute}/generate-mobile-faq`,
  generateMobileFaqController
);
// post route for create mobile faq
mobileFaqRouter.post(
  `${baseRoute}/create-mobile-faq`,
  createMobileFaqController
);

// get all mobile faq router
mobileFaqRouter.get(`${baseRoute}/get-mobile-faqs`, getMobileFaqController);
// delete mobile faq
mobileFaqRouter.delete(
  `${baseRoute}/delete-mobile-faq/:id`,
  deleteMobileFaqController
);
module.exports = mobileFaqRouter;
