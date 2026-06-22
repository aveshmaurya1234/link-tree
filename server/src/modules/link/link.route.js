import express from "express";

import LinkController from "./link.controller.js";
import linkValidator from "./link.validator.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const router = express.Router();

const linkController = new LinkController();

router.post(
    "/",
    authMiddleware,
    validate(linkValidator.createLink()),
    asyncHandler( linkController.createLink.bind(linkController))
);

router.get(
    "/",
    authMiddleware,
    asyncHandler(linkController.getMyLinks.bind(linkController))
);

router.put(
    "/:id",
    authMiddleware,
    validate(linkValidator.updateLink()),
    asyncHandler(linkController.updateLink.bind(linkController))
);

router.delete(
    "/:id",
    authMiddleware,
    asyncHandler(linkController.deleteLink.bind(linkController))
);

router.get(
    "/redirect/:id",
    asyncHandler( linkController.redirectLink.bind(linkController))
);

export default router;