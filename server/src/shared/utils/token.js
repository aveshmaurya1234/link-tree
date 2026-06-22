import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import { app_config } from "../../constant/app.constant.js";

export const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
    profilePic: user.profilePic
  };

  return jwt.sign( payload, env.TOKEN_SECRET, app_config().jwt.token
  );
};