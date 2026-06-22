import { BadRequestError } from "../shared/error/app.error.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(
        new BadRequestError(error.details[0].message)
      );
    }

    next();
  };
};