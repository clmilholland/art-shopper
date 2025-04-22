import { configureStore } from "@reduxjs/toolkit";
import artworkReducer from '../features/artwork/gatherArtworkSlice';

export const store = configureStore({
    reducer: {
        artwork: artworkReducer,
    }
})