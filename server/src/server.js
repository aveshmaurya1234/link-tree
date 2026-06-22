import creatApp from "./app.js";
import { connectDB } from "./config/db.js";
import env from "./config/env.js";

const app = creatApp();

function startServer(){
    connectDB().then(() => {
        app.listen(env.PORT, () => {
            console.log( "server is runing on port", env.PORT)
        })
    }).catch((err) => {
        console.log("error while running server", err)
    })
}

startServer()