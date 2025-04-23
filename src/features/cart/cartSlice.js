import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
           state.push(action.payload)
           console.log(state)
           console.log(action.payload)
        }
    }
})


export const {addToCart} = cartSlice.actions;
export const selectCart = (state) => state.cart;
export default cartSlice.reducer;