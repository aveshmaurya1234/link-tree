import AnalyticsRepository from "./analytics.repository.js";

export default class AnalyticsService {
    constructor() {
        this.analyticsRepo =
        new AnalyticsRepository();
    }

    async getAnalytics(userId) {
        const links = await this.analyticsRepo.getLinks( userId );

        const totalClicks = links.reduce((sum, link) => sum + link.clicks,0);

        return {
            totalLinks: links.length,
            totalClicks,
            links,
        };
    }
}