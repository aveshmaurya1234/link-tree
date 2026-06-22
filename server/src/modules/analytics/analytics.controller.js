import AnalyticsService from "./analytics.service.js";
import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";

export default class AnalyticsController {
    constructor() {
        this.analyticsService =
        new AnalyticsService();
    }

    async getAnalytics(req, res) {
        const analytics =
        await this.analyticsService.getAnalytics(
            req.user._id
        );

        return buildSuccessResponse(
        res,
        "Analytics fetched successfully",
        200,
        analytics
        );
    }
}