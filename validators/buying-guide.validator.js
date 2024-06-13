const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the Joi schema for the specification schema
const buyingGuideSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  websiteBase: Joi.string().optional(),
  description: Joi.string().required(),
  metaInformation: metaInformationSchemaValidator.required(),
});

module.exports = buyingGuideSchemaValidator;
