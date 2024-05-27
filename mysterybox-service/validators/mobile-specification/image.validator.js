const Joi = require("joi");
const mobileImageSchema = Joi.object({
  title: Joi.string().required(),
  mobileInfo: {
    phoneId: Joi.string().required(),
  },
  profileImage: Joi.string().uri().required(),
  contentImages: Joi.array().items(Joi.string().uri()).required(),
});

module.exports = {
  mobileImageSchema,
};
