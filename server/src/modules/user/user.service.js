import bcrypt from "bcrypt";
import LinkRepository from "../link/link.repository.js";
import {
  ConflictError,
  NotFound,
  UnAuthorize,
} from "../../shared/error/app.error.js";

import { generateToken } from "../../shared/utils/token.js";

import UserRepo from "./user.repository.js";

export default class UserService {
    constructor() {
        this.userRepo = new UserRepo();
        this.linkRepo = new LinkRepository();
    }

    async register(data) {
        const existingUser =
        await this.userRepo.findByEmail(data.email);

        if (existingUser) {
        throw new ConflictError(
            "Email already registered"
        );
        }

        const hashedPassword =
        await bcrypt.hash(data.password, 10);

        const user = await this.userRepo.create({
        ...data,
        password: hashedPassword,
        });

        const token = generateToken(user);

        return { user, token };
    }

    async login(data) {
        const user = await this.userRepo.findByEmail(data.email);

        if (!user) {
            throw new NotFound("User not found");
        }

        const isMatch = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!isMatch) {
        throw new UnAuthorize(
            "Invalid credentials"
        );
        }

        const token = generateToken(user);

        return { user, token };
    }

    async getProfile(userId) {
        return await this.userRepo.findById(userId);
    }

    async updateUser(userId, payload) {
        if (payload.username) {
            const existing = await this.userRepo.findByUsername( payload.username );

            if ( existing && existing._id.toString() !== userId.toString()
            ) {
                throw new ConflictError("Username already taken" );
            }
        }

        return await this.userRepo.updateById( userId, payload);
    }

    async getPublicProfile(username) {
        const user = await this.userRepo.findByUsername(username);

        if (!user) {
            throw new NotFound("User not found");
        }

        const links = await this.linkRepo.findByUserId(user._id);

        return { user, links,};
    }
}