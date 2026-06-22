import express from 'express'
import env from './config/env.js'
import morgan from "morgan"
import securityMiddleware from "./middleware/security.middleware.js"
import ErrorHandler from "./middleware/errorHandler.middleware.js"
import userRoute from "./modules/user/user.route.js"
import linkRoute from './modules/link/link.route.js'
import analyticsRoute from "./modules/analytics/analytics.route.js";


export default function creatApp() {

    let app = express()

    if(env.NODE_ENV === 'development'){
        app.use(morgan("dev"))
    }

    securityMiddleware(app)

    app.use("/api/users", userRoute);
    app.use("/api/links", linkRoute);
    app.use("/api/analytics",analyticsRoute);

    app.use(ErrorHandler)

    return app;
}
