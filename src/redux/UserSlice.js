"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUser: (typeof window !== "undefined") ? localStorage?.getItem("isUser") : false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // get localy saved state
        setStateToLocalStorage(state, action) {
            localStorage.setItem("isUser",action?.payload);
            state.isUser = action?.payload;
        }
    }
});

export const { setStateToLocalStorage } = userSlice.actions;
export default userSlice.reducer;
