const Joi = require("joi");

export const schema = Joi.object({
  userID: Joi.string().required(),
  contractName: Joi.string().required(),
  templateID: Joi.string().uuid().length(36).required(),
});
