const Joi = require("joi");

// Define the Joi schema for the buying guide schema
const buyingGuideSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  websiteBase: Joi.string().optional(),
  description: Joi.string().required(),
});

module.exports = buyingGuideSchemaValidator;
