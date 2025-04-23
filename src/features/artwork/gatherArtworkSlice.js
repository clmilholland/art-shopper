import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const getArtworkIDs = createAsyncThunk(
    'gatherArtwork/getArtworkIDs',
    async(_) => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`)
            if(!response.ok) {
                throw new Error('Failed to fetch object IDs');
            }
            const data = await response.json();
            //Shuffle array and take first 80
            const shuffledIDs = data.objectIDs.sort(() => 0.5 - Math.random());
            return shuffledIDs.slice(0,80);
        } catch(error) {
            throw error;
        }
    }
)


export const getArtwork = createAsyncThunk(
    'gatherArtwork/getArtwork',
    async(artID) => {
        try {
            const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artID}`);
            if(!response.ok) {
                throw new Error('Failed to fetch Art Data')
            }
            const data = await response.json();
            return {artID, data};
        } catch(error) {
            throw error;
        }
    }
)

const artworkSlice = createSlice({
    name: 'artwork',
    initialState: {
        artworkIDs: [],
        artwork: {},
        loading: false,
        error: null
    },
    reducers: {},
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
            })
            .addCase(getArtworkIDs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
            })
            // Handle getArtwork
            .addCase(getArtwork.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArtwork.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const ID = action.payload.artID
                state.artwork[ID] = action.payload.data;
                //set a price for artwork
                let randomNumber;
                if(state.artwork[ID].objectBeginDate < 1600) {
                    randomNumber = Math.floor(Math.random() * 1000000);
                } else {
                    randomNumber = Math.floor(Math.random() * 10000);
                }
                state.artwork[ID].price = randomNumber
                //set a artist if there is none
                if(!state.artwork[ID].artistDisplayName.length > 0) {
                    state.artwork[ID].artistDisplayName = 'Unknown'
                } 
               
            })
            .addCase(getArtwork.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Capture error message
            });
    }
});


export const selectAllArtworkIDs = (state) => state.artwork.artworkIDs;
export const selectALLArtwork = (state) => state.artwork.artwork;
export const selectLoading = (state) => state.artwork.loading;
export const selectError = (state) => state.artwork.error;
export default artworkSlice.reducer;