import { createSlice } from "@reduxjs/toolkit";

const filteredArtworkSlice = createSlice({
    name: 'filteredArtwork',
    initialState: {
        cultureFilters: [],
        activeFilters: [],
    },
    reducers: {
        addToCultureFilters: (state, action) => {
            state.cultureFilters.push(action.payload);
        },
        clearCultureFilters: (state, action) => {
            state.cultureFilters = [];
        },
        addToActiveFilters: (state, action) => {
            state.activeFilters.push(action.payload)
        },
        removeFromActiveFilters: (state, action) => {
            console.log(action.payload)
            state.activeFilters = state.activeFilters.filter(item => !(item.id === action.payload.id && item.value === action.payload.value))
        }
    }
})

export const {addToCultureFilters, clearCultureFilters, addToActiveFilters, removeFromActiveFilters} = filteredArtworkSlice.actions;
export const selectCultureFilters = (state) => state.filteredArtwork.cultureFilters;
export const selectActiveFilters = (state) => state.filteredArtwork.activeFilters;
export default  filteredArtworkSlice.reducer;