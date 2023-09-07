"use client";

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    subTotal: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action) {
            const { slug } = action.payload;
            const product = state.cart?.find(p => p.slug === slug);
            if (product) {
                product.qty += 1;
            }
            else {
                state.cart?.push(action.payload);
            }
            localStorage.setItem('codesWearShoppingCart', JSON.stringify(state.cart));
        },
        remove(state, action) {
            const slug = action.payload;
            const product = state.cart?.find(p => p.slug === slug);
            if (product.qty > 1) {
                product.qty -= 1;
            }
            else {
                state.cart = state.cart.filter((item) => item.slug !== slug);
                state.subTotal = 0;
            }
            localStorage.setItem('codesWearShoppingCart', JSON.stringify(state.cart));
        },
        clear(state) {
            state.cart = [];
            state.subTotal = 0;
            localStorage.setItem('codesWearShoppingCart', JSON.stringify(state.cart));
        },
        subTotal(state) {
            let total = 0;
            for (const product of state.cart) {
                total += product.qty * product.price;
            }
            state.subTotal = total;
            localStorage.setItem('codesWearShoppingCart', JSON.stringify(state.cart));
        },
        getCartFromLocalStorage(state) {
            const localStorageValue = JSON.parse(localStorage.getItem('codesWearShoppingCart'));
            if (localStorageValue) {
                state.cart = localStorageValue;
            }
        }
    }
})

export const { add, remove, clear, subTotal, getCartFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
