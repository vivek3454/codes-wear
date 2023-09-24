"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: (typeof window !== "undefined") && JSON.parse(localStorage.getItem("isUser")),
    role: (typeof window !== "undefined") && localStorage.getItem("role") || ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // get localy saved state
        setStateToLocalStorage(state, action) {
            localStorage.setItem("isUser",action?.payload?.isUser);
            localStorage.setItem("role",action?.payload?.role);
            state.isUser = action?.payload?.isUser;
            state.role = action?.payload?.role;
        }
    }
});

export const { setStateToLocalStorage } = userSlice.actions;
export default userSlice.reducer;
