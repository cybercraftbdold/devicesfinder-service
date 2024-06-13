const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the Joi schema for each FAQ item
const faqListItemSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
});

// Define the Joi schema for the specification schema
const deviceReviewSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  websiteBase: Joi.string().optional(),
  faqList: Joi.array().items(faqListItemSchema).required(),
});

module.exports = deviceReviewSchemaValidator;
