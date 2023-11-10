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

module.exports.schemas = {
  sendPlayDataSchema: Joi.object().keys({
    difficulty: Joi.number().min(1).max(5).required(),
    length: Joi.number().required(),
  }),
  updatePlayDataSchema: Joi.object().keys({
    guess: Joi.string().required().escapeHTML(),
    elemId: Joi.string().required().escapeHTML(),
    additionalData: Joi.object({
      sessionId: Joi.string().uuid().required().escapeHTML(),
      pageNum: Joi.number().integer().required(),
      action: Joi.string().valid("next", "back").required().escapeHTML(),
    }).required(),
  }),
  registrationSchema: Joi.object().keys({
    username: Joi.string().alphanum().min(7).max(30).required().escapeHTML(),
    password: Joi.string().alphanum().min(7).max(30).required().escapeHTML(),
    email: Joi.string().email().required().escapeHTML(),
  }),
  changePasswordSchema: Joi.object().keys({
    oldPassword: Joi.string().alphanum().min(7).max(30).required().escapeHTML(),
    newPassword: Joi.string().alphanum().min(7).max(30).required().escapeHTML(),
    repeatPassword: Joi.string()
      .alphanum()
      .min(7)
      .max(30)
      .required()
      .escapeHTML(),
  }),
  editProfileSchema: Joi.object().keys({
    displayName: Joi.string().alphanum().max(30).allow(null, "").escapeHTML(),
    realName: Joi.string().alphanum().max(60).allow(null, "").escapeHTML(),
    birthDate: Joi.date().allow(null, ""),
    country: Joi.string().alphanum().min(2).max(2).allow(null, "").escapeHTML(),
    location: Joi.string().alphanum().allow(null, "").escapeHTML(),
    bio: Joi.string().alphanum().allow(null, "").escapeHTML(),
    facebook: Joi.string().uri().allow(null, "").escapeHTML(),
    twitter: Joi.string().uri().allow(null, "").escapeHTML(),
    instagram: Joi.string().uri().allow(null, "").escapeHTML(),
    tumblr: Joi.string().uri().allow(null, "").escapeHTML(),
  }),
};
