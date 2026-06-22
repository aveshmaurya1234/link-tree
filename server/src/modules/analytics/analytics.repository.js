import LinkRepository from "../link/link.repository.js";

export default class AnalyticsRepository {
    constructor() {
        this.linkRepo = new LinkRepository();
    }

    async getLinks(userId) {
        return await this.linkRepo.findByUserId(userId);
    }
}