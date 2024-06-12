const Joi = require("joi");

// Define the Joi schema for metaInformation
const metaInformationSchemaValidator = Joi.object({
  canonicalUrl: Joi.string()
    .pattern(/^[a-zA-Z0-9-]+$/)
    .message("Canonical URL must only contain letters, numbers, and hyphens")
    .required(),
  mainKeyword: Joi.string().required(),
  metaDescription: Joi.string().required(),
  metaTitle: Joi.string().required(),
  seedKeyword: Joi.array().items(Joi.string()).required(),
});

module.exports = metaInformationSchemaValidator;
