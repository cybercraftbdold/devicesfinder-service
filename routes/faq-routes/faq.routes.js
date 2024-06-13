const { Router } = require("express");
const { createFaqController } = require("../../controller/faq/faq.controller");
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

module.exports = faqRouter;
