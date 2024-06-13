const Joi = require("joi");

// Define the Joi schema for the cons
const consSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  websiteBase: Joi.string().optional(),
  description: Joi.string().required(),
});

module.exports = consSchemaValidator;
