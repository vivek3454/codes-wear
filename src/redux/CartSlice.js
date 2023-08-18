"use client";

import {createSlice} from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action){
            
            // if (state.find((item)=> item.id === action.payload.id)) {
            //     let a;
            //     a = state.find((item)=> item.id === action.payload.id);
            //     a.qty = a.qty + 1;
            //     state = state.filter((item)=> item.id !== action.payload.id);
            //     return [a];
            // }
            // else{
                state.push(action.payload);
            // }
        },
        remove(state, action){
            return state.filter((item)=> item.id !== action.payload);
        },
        clear(state){
            return state = [];
        }
    }
})

export const {add, remove, clear} = cartSlice.actions;
export default cartSlice.reducer;
