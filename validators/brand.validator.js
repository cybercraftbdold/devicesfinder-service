const Joi = require("joi");

const brandValidator = Joi.object({
  title: Joi.string().required(),
  image: Joi.string().required(),
});

module.exports = {
  brandValidator,
};
