const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

const blogSchemaValidator = Joi.object({
  deviceId: Joi.string().required(),
  keyWordId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.object({
    imageUrl: Joi.string().allow(""),
    title: Joi.string().allow(""),
    altText: Joi.string().allow(""),
    caption: Joi.string().allow(""),
    description: Joi.string().allow(""),
  }).required(),
  metaInformation: metaInformationSchemaValidator.required(),
});

module.exports = blogSchemaValidator;
