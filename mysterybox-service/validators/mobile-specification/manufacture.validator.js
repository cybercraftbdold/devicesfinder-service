const Joi = require("joi");
const mobileManufactureSchema = Joi.object({
  manufactureName: Joi.string().required(),
  manufactureWebsite: Joi.string().uri().required(),
  manufacturePhone: Joi.string().required(),
  manufactureSocial: Joi.array().items(Joi.string().uri()).required(),
  manufactureEmail: Joi.array().items(Joi.string().email()).required(),
});

module.exports = {
  mobileManufactureSchema,
};
