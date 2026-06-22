import mongoose from "mongoose";
import env from "./env.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("Error in mongoDB connection", error);
    }
};