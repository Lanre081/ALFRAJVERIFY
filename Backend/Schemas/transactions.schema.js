const { Joi } = require("celebrate");

const top_up_schema = Joi.object({
  amount: Joi.number().positive().min(100).required(),
})
  .required()
  .strict()
  .options({ stripUnknown: true });

module.exports = { top_up_schema };
