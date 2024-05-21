const Joi = require("joi");

// mobile profile keyword validator
const mobileProfileKeywordSchema = Joi.object({
  keywords: Joi.object({
    mainKeyword: Joi.string().required(),
    relevantKeyword: Joi.string().required(),
  }).required(),
  profile: Joi.object({
    phoneName: Joi.string().required(),
    relevantURL: Joi.string().uri().required(),
  }).required(),
  vendor: Joi.object({
    vendorName: Joi.string().required(),
    vendorPhone: Joi.string().required(),
    vendorEmail: Joi.string().email().required(),
    vendorWebsite: Joi.string().uri().required(),
    vendorSocial: Joi.string().uri().required(),
  }).required(),
  types: Joi.array().items(Joi.string()).required(),
  websiteInfo: Joi.object({
    websiteName: Joi.string().required(),
    websiteId: Joi.string().required(),
  }).required(),
});
// mobile blog keyword schema
const mobileBlogKeywordSchema = Joi.object({
  mainKeyword: Joi.string().required(),
  relevantKeyword: Joi.string().required(),
  relevantUrl: Joi.string().uri().required(),
  types: Joi.array().items(Joi.string()).required(),
  websiteInfo: Joi.object({
    websiteName: Joi.string().required(),
    websiteId: Joi.string().required(),
  }).required(),
});

module.exports = {
  mobileProfileKeywordSchema,
  mobileBlogKeywordSchema,
};