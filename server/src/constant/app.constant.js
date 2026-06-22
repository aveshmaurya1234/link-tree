import env from "../config/env.js"

export default{
    PORT: 5000,
    NODE_ENV: 'development',
    RATELIMIT_WINDOWAS: 15 * 60 * 1000,
    RATELIMIT: 100,
    MONGO_URL: "mongodb://localhost:27017",
}

export const app_config = () => {
    return {
        jwt: {
            token: { expiresIn: env.NODE_ENV === "production" ? "1d" : "1h" },
        },
        cookie: {
            token: {
                httpOnly: false,
                secure: env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: env.NODE_ENV === "production" ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000
            }
        },
    }
}