import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice.js";
import userReducer from "./UserSlice.js";

const store = configureStore({
    reducer:{
        cart:cartReducer,
        user:userReducer,
    }
});

export default store;
