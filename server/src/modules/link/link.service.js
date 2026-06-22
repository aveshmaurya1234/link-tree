import LinkRepository from "./link.repository.js";
import {NotFound,UnAuthorize,} from "../../shared/error/app.error.js";

export default class LinkService {
  constructor() {
    this.linkRepo = new LinkRepository();
  }

  async createLink(userId, payload) {
    return await this.linkRepo.create({
      userId,
      ...payload,
    });
  }

  async getMyLinks(userId) {
    return await this.linkRepo.findByUserId(userId);
  }

  async updateLink(userId, linkId, payload) {
    const link = await this.linkRepo.findById(linkId);

    if (!link) {
      throw new NotFound("Link not found");
    }

    if (link.userId.toString() !== userId.toString()) {
      throw new UnAuthorize("Access denied");
    }

    return await this.linkRepo.updateById(
      linkId,
      payload
    );
  }

  async deleteLink(userId, linkId) {
    const link = await this.linkRepo.findById(linkId);

    if (!link) {
      throw new NotFound("Link not found");
    }

    if (link.userId.toString() !== userId.toString()) {
      throw new UnAuthorize("Access denied");
    }

    await this.linkRepo.deleteById(linkId);

    return true;
  }

  async redirectToLink(linkId) {
    const link = await this.linkRepo.incrementClick(
      linkId
    );

    if (!link) {
      throw new NotFound("Link not found");
    }

    return link;

  }
}