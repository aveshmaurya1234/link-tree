import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    username: "",
    bio: "",
    profilePic: "",
    token: localStorage.getItem("token") || "",
};

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        setUser: (state, action) => {
            return {...state, ...action.payload,};
        },

        setToken: (state, action) => {
            state.token = action.payload;
        },

        logout: () => {
            localStorage.removeItem("token");

        return {
            ...initialState,
            token: "",
        };
        },
    },
});

export const { setUser,setToken,logout,} = userSlice.actions;

export default userSlice.reducer;