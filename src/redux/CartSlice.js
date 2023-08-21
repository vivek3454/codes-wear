"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    subTotal:0
};

const cartSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        add(state, action) {
            const { id } = action.payload;
            const product = state.products?.find(p => p.id === id);
            if (product) {
                product.qty += 1;
            }
            else {
                state.products?.push(action.payload);
            }
            localStorage.setItem('productCart',JSON.stringify(state.products));
        },
        remove(state, action) {
            const id = action.payload;
            const product = state.products?.find(p => p.id === id);
            if (product.qty > 1) {
                product.qty -= 1;
            }
            else {
                state.products = state.products.filter((item) => item.id !== id);
                state.subTotal = 0;
            }
            localStorage.setItem('productCart', JSON.stringify(state.products));
        },
        clear(state) {
            state.products = [];
            state.subTotal = 0;
            localStorage.setItem('productCart', JSON.stringify(state.products));
        },
        subTotal(state) {
            for (const product of state.products) {
                state.subTotal = product.qty * product.price;
            }
            localStorage.setItem('productCart', JSON.stringify(state.products));
        },
        getProductsCartFromLocalStorage(state){
            const localStorageValue = JSON.parse(localStorage.getItem('productCart'));
            state.products = localStorageValue;
        }
    }
})

export const { add, remove, clear, subTotal, getProductsCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
