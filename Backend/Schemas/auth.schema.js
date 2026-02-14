const Joi = require("joi");

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
})
  .required()
  .options({ stripUnknown: true });

module.exports = { refreshTokenSchema };
