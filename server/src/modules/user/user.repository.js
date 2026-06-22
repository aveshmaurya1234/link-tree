import linkModel from "../../models/link.model.js";
import userModel from "../../models/user.model.js";

export default class UserRepo {
    async create(payload) {
        return await userModel.create(payload);
    }

    async findByEmail(email) {
        return await userModel.findOne({ email });
    }

    async findById(id) {
        return await userModel
        .findById(id)
        .select("-password")
        .lean();
    }

    async findByUsername(username) {
        return await userModel
        .findOne({ username })
        .select("-password")
        .lean();
    }

    async updateById(id, payload) {
        return await userModel
        .findByIdAndUpdate(
            id,
            {
            name: payload.name,
            username: payload.username,
            bio: payload.bio,
            profilePic: payload.profilePic,
            },
            { new: true }
        )
        .select("-password");
    }
    async findByUserId(userId) {
        return await linkModel
            .find({ userId })
            .sort({ createdAt: -1 });
    }
}