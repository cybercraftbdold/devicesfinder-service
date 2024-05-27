const Joi = require("joi");

// mobile profile keyword validator
const mobileProfileKeywordSchema = Joi.object({
  deviceTitle: Joi.string().required(),
  deviceType: Joi.string().required(),
  deviceSubType: Joi.string().required(),
  relevantUrl: Joi.array().items(Joi.string().uri()).required(),
  keyword: Joi.object({
    mainKeyword: Joi.string().required(),
    releventKeyword: Joi.array().required(), // Note the typo in 'releventKeyword', ensure it matches your actual data keys
  }).required(),
  manufacture: Joi.object({
    manufactureName: Joi.string().required(),
    manufactureWebsite: Joi.string().uri().required(),
    manufacturePhone: Joi.string().required(),
    manufactureSocial: Joi.array().items(Joi.string().uri()).required(),
    manufactureEmail: Joi.array().items(Joi.string().email()).required(),
  }).required(),
});
// mobile blog keyword schema
const mobileBlogKeywordSchema = Joi.object({
  mainKeyword: Joi.string().required(),
  relevantKeyword: Joi.string().required(),
  relevantUrl: Joi.array().required(),
  types: Joi.array().items(Joi.string()).required(),
});

module.exports = {
  mobileProfileKeywordSchema,
  mobileBlogKeywordSchema,
};
