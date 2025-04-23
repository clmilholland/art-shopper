import { configureStore } from "@reduxjs/toolkit";
import artworkReducer from '../features/artwork/gatherArtworkSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
    reducer: {
        artwork: artworkReducer,
        cart: cartReducer
    }
})