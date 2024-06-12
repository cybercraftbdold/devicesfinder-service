const Joi = require("joi");

// Define the Joi schema for metaInformation
const metaInfoSchema = Joi.object({
  canonicalUrl: Joi.string().uri().optional(),
  mainKeyword: Joi.string().optional(),
  metaDescription: Joi.string().optional(),
  metaTitle: Joi.string().optional(),
  seedKeyword: Joi.array().items(Joi.string()).optional(),
});

// Define the Joi schema for the specification schema
const specificationValidatorSchema = Joi.object({
  title: Joi.string().required(),
  deviceId: Joi.string().required(),
  specification: Joi.any().optional(), // Schema.Types.Mixed can be any type
  cons: Joi.string().default(""),
  pros: Joi.string().default(""),
  images: Joi.any().required(), // Schema.Types.Mixed can be any type
  metaInformation: metaInfoSchema.optional(),
  viewCount: Joi.number().default(0),
});

module.exports = specificationValidatorSchema;
