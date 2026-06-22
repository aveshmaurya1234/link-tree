import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  constructor(message, statusCode, details = "") {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
  }
}
export const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    logout: err.statusCode === 401,
  });
};

// 400 Bad Request
export class BadRequestError extends AppError {
  constructor(message = "Bad Request", details = "") {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

// 401 Unauthorized
export class UnAuthorize extends AppError {
  constructor(message = "Unauthorized", details = "") {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

// 404 Not Found
export class NotFound extends AppError {
  constructor(message = "Resource Not Found",  details = "") {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}

// 409 Conflict
export class ConflictError extends AppError {
  constructor(message = "Conflict", details = "") {
    super(message, StatusCodes.CONFLICT, details);
  }
}


// 500 Internal Server Error
export class InternalServerError extends AppError {
  constructor(message = "Internal Server Error", details = "") {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR, details);
  }
}