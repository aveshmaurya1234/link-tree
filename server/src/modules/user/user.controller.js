import { buildSuccessResponse } from "../../shared/utils/buildSuccessResponse.js";
import { clearAuthCookies, setAuthCookies } from "../../shared/utils/cookie.js";
import UserService from "./user.service.js";

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async register(req, res) {
        const result = await this.userService.register(req.body);
        setAuthCookies(res, result.token);
        return buildSuccessResponse(res,"User Created Successfully", 201,
        {
            user: result.user,
            token: result.token,
        }
        );
    }

    async login(req, res) {
        const result = await this.userService.login(req.body);

        setAuthCookies(res, result.token);

        return buildSuccessResponse( res, "Login Successful",200,
            {
                user: result.user,
                token: result.token,
            }
        );
    }

    async profilePage(req, res) {
        const user = await this.userService.getProfile( req.user._id);
        return buildSuccessResponse(res, "Profile Fetched", 200,user );
    }

    async updateUser(req, res) {
        const user = await this.userService.updateUser( req.user._id, req.body);

        return buildSuccessResponse( res, "Profile Updated Successfully", 200, user );
    }

    async getPublicProfile(req, res) {
        const data = await this.userService.getPublicProfile( req.params.username);

        return buildSuccessResponse(res,"Public Profile Fetched",200, data);
    }

    async logout(req, res) {
        clearAuthCookies(res);
        return buildSuccessResponse( res, "Logout Successful", 200 );
    }
}