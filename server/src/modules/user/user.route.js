import express from "express";
import UserController from "./user.controller.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";
import { validate } from "../../middleware/validate.middleware.js";
import userValidator from "./user.validator.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

const userController = new UserController();

router.post(
  "/register",
  validate(userValidator.register()),
  asyncHandler(userController.register.bind(userController))
);

router.post(
  "/login",
  validate(userValidator.login()),
  asyncHandler(userController.login.bind(userController))
);

router.get(
  "/profile",
  authMiddleware,
  asyncHandler(userController.profilePage.bind(userController))
);

router.put(
  "/profile",
  authMiddleware,
  validate(userValidator.updateProfile()),
  asyncHandler(userController.updateUser.bind(userController))
);

router.post(
  "/logout",
  asyncHandler(userController.logout.bind(userController))
);

router.get(
  "/public/:username",
  asyncHandler( userController.getPublicProfile.bind(userController)
  )
);

export default router;