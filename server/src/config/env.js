import "dotenv/config";
import z from "zod" 
import appConstant from "../constant/app.constant.js";

const envSchema = z.object({
    PORT: z.coerce.number().default(appConstant.PORT),
    NODE_ENV: z.string().default(appConstant.NODE_ENV),
    CORS_ORIGIN: z.string(),
    RATELIMIT_WINDOWAS: z.coerce.number().default(appConstant.RATELIMIT_WINDOWAS),
    RATELIMIT: z.coerce.number().default(appConstant.RATELIMIT),
    MONGO_URL: z.string().default(appConstant.MONGO_URL),
    TOKEN_SECRET: z.string(),
})

const parsed = envSchema.safeParse(process.env)
if(!parsed.success){
    console.log("check your env's")
}

export default parsed.data;