import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        message: null
    },
    reducers: {
        addToCart: (state, action) => {
           state.cart.push(action.payload);
           state.message = "Item added to cart!";
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.objectID !== action.payload);
        },
        clearMessage: (state, action) => {
            state.message = null;
        }
    }
})


export const {addToCart, removeFromCart, clearMessage} = cartSlice.actions;
export const selectCart = (state) => state.cart.cart;
export const selectMessage = (state) => state.cart.message;
export default cartSlice.reducer;