import express from "express";

import AnalyticsController from "./analytics.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../shared/utils/asyncHandler.js";

const router = express.Router();

const analyticsController = new AnalyticsController();

router.get(
    "/",
    authMiddleware,
    asyncHandler(analyticsController.getAnalytics.bind(analyticsController))
);

export default router;