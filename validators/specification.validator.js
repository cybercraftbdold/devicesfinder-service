const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the Joi schema for the specification schema
const specificationSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  websiteBase: Joi.string().optional(),
  specification: Joi.any().required(),
  images: Joi.any().required(),
  brandInfo: Joi.object().required(),
  metaInformation: metaInformationSchemaValidator.required(),
  viewCount: Joi.number().default(0),
});

module.exports = specificationSchemaValidator;
