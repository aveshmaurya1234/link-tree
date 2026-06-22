import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";
import LinkService from "./link.service.js";

export default class LinkController {
    constructor() {
        this.linkService = new LinkService();
    }

    async createLink(req, res) {
        const link = await this.linkService.createLink(
        req.user._id,
        req.body
        );

        return buildSuccessResponse(
        res,
        "Link Created Successfully",
        201,
        link
        );
    }

    async getMyLinks(req, res) {
        const links = await this.linkService.getMyLinks(
        req.user._id
        );

        return buildSuccessResponse(
        res,
        "Links fetched successfully",
        200,
        links
        );
    }

    async updateLink(req, res) {
        const link = await this.linkService.updateLink(
        req.user._id,
        req.params.id,
        req.body
        );

        return buildSuccessResponse(
        res,
        "Link updated successfully",
        200,
        link
        );
    }

    async deleteLink(req, res) {
        await this.linkService.deleteLink(
        req.user._id,
        req.params.id
        );

        return buildSuccessResponse(
        res,
        "Link deleted successfully",
        200
        );
    }

    async redirectLink(req, res) {
        const link =
        await this.linkService.redirectToLink(
            req.params.id
        );

        return res.redirect(link.url);
    }
}