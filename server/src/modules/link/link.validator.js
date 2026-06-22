import Joi from "joi";

class LinkValidator {
  createLink() {
    return Joi.object({
      title: Joi.string().trim().required(),
      url: Joi.string().uri().required(),
    });
  }

  updateLink() {
    return Joi.object({
      title: Joi.string().trim(),
      url: Joi.string().uri(),
    });
  }
}

export default new LinkValidator();