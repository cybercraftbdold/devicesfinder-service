const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the Joi schema for the specification schema
const specificationSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().required(),
  specification: Joi.any().required(),
  cons: Joi.string().default(""),
  pros: Joi.string().default(""),
  images: Joi.any().required(),
  metaInformation: metaInformationSchemaValidator.required(),
  viewCount: Joi.number().default(0),
});

module.exports = specificationSchemaValidator;
