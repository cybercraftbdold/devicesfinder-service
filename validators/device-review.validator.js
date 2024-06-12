const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the Joi schema for the specification schema
const deviceReviewSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  metaInformation: metaInformationSchemaValidator.required(),
});

module.exports = deviceReviewSchemaValidator;
