const Joi = require("joi");
const metaInformationSchemaValidator = require("./meta-information.validator");

// Define the schema for each image object
const imageSchema = Joi.object({
  imageUrl: Joi.string().required(),
  title: Joi.string().required(),
  altText: Joi.string().required(),
  caption: Joi.string().allow("").optional(),
  description: Joi.string().required(),
});

// Define the Joi schema for the specification schema
const specificationSchemaValidator = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().required(),
  deviceType: Joi.object().required(),
  deviceSubType: Joi.object().required(),
  deviceId: Joi.string().optional(),
  reviewStatus: Joi.string().required(),
  websiteBase: Joi.string().optional(),
  specification: Joi.any().required(),
  images: Joi.object({
    profileImage: imageSchema,
    contentImages: Joi.array().items(imageSchema).required(),
  }).required(),
  brandInfo: Joi.object().required(),
  metaInformation: metaInformationSchemaValidator.required(),
  viewCount: Joi.number().default(0),
});

module.exports = specificationSchemaValidator;
