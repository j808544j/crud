const Joi = require("joi");

export const schema = Joi.object({
  username: Joi.string().min(4).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
