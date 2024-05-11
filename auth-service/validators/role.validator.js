const Joi = require("joi");
const roleSchema = Joi.object({
  roleName: Joi.string().required(),
  menus: Joi.array().required(),
});

module.exports = {
  roleSchema,
};
