const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the Joi schema for the cons
const consSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  reviewStatus: Joi.string().required(),
  websiteBase: Joi.string().optional(),
  description: Joi.string().required(),
  metaInformation: metaInformationSchemaValidator,
});

module.exports = consSchemaValidator;
