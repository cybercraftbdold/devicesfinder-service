const Joi = require("joi");

const brandSchemaValidator = Joi.object({
  title: Joi.string().required(),
  image: Joi.object().required(),
  metaInformation: Joi.object().required(),
  websiteBase: Joi.string().optional(),
});

module.exports = brandSchemaValidator;
