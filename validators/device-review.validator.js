const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

const deviceReviewImageSchemaValidator = Joi.object({
  imageUrl: Joi.string().required(),
  title: Joi.string().required(),
  altText: Joi.string().required(),
  caption: Joi.string().required(),
  description: Joi.string().required(),
}).required();

// Define the Joi schema for the specification schema
const deviceReviewSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().optional(),
  reviewStatus: Joi.string().required(),
  image: deviceReviewImageSchemaValidator,
  websiteBase: Joi.string().optional(),
  description: Joi.string().required(),
  metaInformation: metaInformationSchemaValidator.required(),
});

module.exports = deviceReviewSchemaValidator;
