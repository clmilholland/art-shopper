import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getArtworkIDs = createAsyncThunk(
    'artwork/getArtworkIDs',
    async () => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`);
            if (!response.ok) {
                throw new Error('Failed to fetch object IDs');
            }
            const data = await response.json();
            // Shuffle array and take first 80
            const shuffledIDs = data.objectIDs.sort(() => 0.5 - Math.random());
            return shuffledIDs.slice(0, 80);
        } catch (error) {
            throw error;
        }
    }
);

export const getArtwork = createAsyncThunk(
    'artwork/getArtwork',
    async (artID) => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Art Data');
            }
            const data = await response.json();
            return { artID, data };
        } catch (error) {
            throw error;
        }
    }
);

const artworkSlice = createSlice({
    name: 'artwork',
    initialState: {
        artworkIDs: [],
        artwork: {},
        hasFetchedArtworkIDs: false,
        hasDispatchedAllArtwork: false,
        hasAllArtworkData: false,
        loading: false,
        error: null,
    },
    reducers: {
        resetLoadState: (state) => {
            state.hasFetchedArtworkIDs = false;
            state.hasDispatchedAllArtwork = false;
            state.hasAllArtworkData = false;
            state.artworkIDs = [];
            state.artwork = {};
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle getArtworkIDs
            .addCase(getArtworkIDs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArtworkIDs.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.artworkIDs = action.payload;
                state.artwork = {};
                state.hasFetchedArtworkIDs = true;
            })
            .addCase(getArtworkIDs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle getArtwork
            .addCase(getArtwork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArtwork.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const ID = action.payload.artID;
                state.artwork[ID] = action.payload.data;
                // Set a price for artwork
                let randomNumber;
                if (state.artwork[ID].objectBeginDate < 1600) {
                    randomNumber = Math.floor(Math.random() * 1000000);
                } else {
                    randomNumber = Math.floor(Math.random() * 10000);
                }
                state.artwork[ID].price = randomNumber;
                // Set an artist if there is none
                if (!state.artwork[ID].artistDisplayName?.length > 0) {
                    state.artwork[ID].artistDisplayName = 'Unknown';
                }
                // Check if all artwork data is fetched
                if (Object.keys(state.artwork).length >= state.artworkIDs.length && state.artworkIDs.length > 0) {
                    state.hasDispatchedAllArtwork = true;
                    state.hasAllArtworkData = true;
                }
            })
            .addCase(getArtwork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetLoadState } = artworkSlice.actions;

export const selectAllArtworkIDs = (state) => state.artwork.artworkIDs;
export const selectAllArtwork = (state) => state.artwork.artwork;
export const selectLoading = (state) => state.artwork.loading;
export const selectError = (state) => state.artwork.error;
export const selectHasFetchedArtworkIDs = (state) => state.artwork.hasFetchedArtworkIDs;
export const selectHasDispatchedAllArtwork = (state) => state.artwork.hasDispatchedAllArtwork;
export const selectHasAllArtworkData = (state) => state.artwork.hasAllArtworkData;

export default artworkSlice.reducer;