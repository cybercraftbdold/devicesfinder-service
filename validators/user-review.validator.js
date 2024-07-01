const Joi = require("joi");

const userReviewSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  deviceId: Joi.string().required(),
  reviewStatus: Joi.string().valid("draft", "published", "review").required(),
  rating: Joi.number().min(0).max(5).required(),
  description: Joi.string().required(),
});

module.exports = userReviewSchemaValidator;
