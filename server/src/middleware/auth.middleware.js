import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { UnAuthorize } from "../shared/error/app.error.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new UnAuthorize("Token Not Found");
    }

    const payload = jwt.verify(token, env.TOKEN_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new UnAuthorize("Token Expired");
    }

    throw new UnAuthorize("Invalid Token");
  }
};