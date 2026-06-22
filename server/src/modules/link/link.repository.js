import linkModel from "../../models/link.model.js";

export default class LinkRepository {
    async create(payload) {
        return await linkModel.create(payload);
    }

    async findById(id) {
        return await linkModel.findById(id);
    }

    async findByUserId(userId) {
        return await linkModel
        .find({ userId })
        .sort({ createdAt: -1 });
    }

    async updateById(id, payload) {
        return await linkModel.findByIdAndUpdate(
        id,
        payload,
        { new: true }
        );
    }

    async deleteById(id) {
        return await linkModel.findByIdAndDelete(id);
    }

    async incrementClick(id) {
        return await linkModel.findByIdAndUpdate(
        id,
        {
            $inc: { clicks: 1 },
        },
        { new: true }
        );
    }
    
}