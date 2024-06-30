const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

const blogSchemaValidator = Joi.object({
  deviceId: Joi.string().required(),
  keywordId: Joi.string().required(),
  categories: Joi.array().required(),
  reviewStatus: Joi.string().required(),
  websiteBase: Joi.string().optional(),
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
