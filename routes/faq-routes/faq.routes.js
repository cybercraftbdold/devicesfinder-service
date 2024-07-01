const { Router } = require("express");
const {
  createFaqController,
  getAllFaqController,
  deleteFaqController,
} = require("../../controller/faq/faq.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const faqSchemaValidator = require("../../validators/faq.validator");

const faqRouter = Router();

// create faq route
faqRouter.post(
  `${baseRoute}/create-faq`,
  requestValidator(faqSchemaValidator),
  createFaqController
);

// get all faq route
faqRouter.get(`${baseRoute}/get-faqs`, getAllFaqController);

// delete faq route
faqRouter.delete(`${baseRoute}/delete-faq/:id`, deleteFaqController);

module.exports = faqRouter;
