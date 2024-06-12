const Joi = require("joi");

const brandSchemaValidator = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
});

module.exports = brandSchemaValidator;
