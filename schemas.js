const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.sendPlayDataSchema = Joi.object({
  difficulty: Joi.number().max(5).required(),
  sessionLength: Joi.number().required(),
});
module.exports.updatePlayDataSchema = Joi.object({
  guess: Joi.string().required(),
  elemId: Joi.string().required(),
  additionalData: Joi.object({
    sessionId: Joi.string().uuid().required(),
    pageNum: Joi.number().integer().required(),
    action: Joi.string().valid("next", "back").required(),
  }).required(),
});
module.exports.registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(7).max(30).required(),
  password: Joi.string().alphanum().min(7).max(30).required(),
  email: Joi.string().email().required(),
});
module.exports.changePasswordSchema = Joi.object({
  oldPassword: Joi.string().alphanum().min(7).max(30).required(),
  newPassword: Joi.string().alphanum().min(7).max(30).required(),
  repeatPassword: Joi.string().alphanum().min(7).max(30).required(),
});
module.exports.editProfileSchema = Joi.object({
  displayName: Joi.string().alphanum().allow(null, ""),
  realName: Joi.string().alphanum().allow(null, ""),
  birthDate: Joi.date().allow(null, ""),
  country: Joi.string().alphanum().min(2).max(2).allow(null, ""),
  location: Joi.string().alphanum().allow(null, ""),
  bio: Joi.string().alphanum().allow(null, ""),
  facebook: Joi.string().uri().allow(null, ""),
  twitter: Joi.string().uri().allow(null, ""),
  instagram: Joi.string().uri().allow(null, ""),
  tumblr: Joi.string().uri().allow(null, ""),
});
