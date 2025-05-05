import { configureStore } from "@reduxjs/toolkit";
import artworkReducer from '../features/artwork/gatherArtworkSlice';
import cartReducer from '../features/cart/cartSlice';
import filteredArtworkReducer from '../features/filteredArtwork/filteredArtworkSlice';

export const store = configureStore({
    reducer: {
        artwork: artworkReducer,
        cart: cartReducer,
        filteredArtwork: filteredArtworkReducer
    }
})