const Joi = require("joi");

// Define the Joi schema for metaInformation
const metaInformationSchemaValidator = Joi.object({
  canonicalUrl: Joi.string().required(),
  mainKeyword: Joi.string().required(),
  metaDescription: Joi.string().required(),
  metaTitle: Joi.string().required(),
  seedKeyword: Joi.array().items(Joi.string()).required(),
});

module.exports = metaInformationSchemaValidator;
