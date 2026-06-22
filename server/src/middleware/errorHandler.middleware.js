import { StatusCodes } from "http-status-codes";


const ErrorHandler = (err, req, res, next) => {
  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: err.message || "Internal Server Error",
      details: err.details || "",
      // 401 Unauthorized => logout true
      logout:err.statusCode === StatusCodes.UNAUTHORIZED,
    });
};

export default ErrorHandler;