import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
        },

        bio: {
            type: String,
            default: "",
            maxlength: 200,
        },

        profilePic: {
            type: String,
            default: "https://img.magnific.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;