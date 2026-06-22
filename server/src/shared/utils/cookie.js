import { app_config } from "../../constant/app.constant.js";

export const setAuthCookies = (res, token) => {
    res.cookie( "token", token, app_config().cookie.token );
};

export const clearAuthCookies = (res) => {
    res.clearCookie("token");
};