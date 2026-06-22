import Joi from "joi";

class UserValidator {
  register() {
    return Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
  }

  login() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
  }

  updateProfile() {
    return Joi.object({
      name: Joi.string().trim(),

      username: Joi.string()
        .trim()
        .min(3)
        .max(30),

      bio: Joi.string()
        .max(200)
        .allow(""),

      profilePic: Joi.string()
        .allow("")
        .optional(),
    });
  }
}

export default new UserValidator();