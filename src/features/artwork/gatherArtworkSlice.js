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

        }
    }
)


export const getArtwork = createAsyncThunk(
    'gatherArtwork/getArtwork',
    async(artID) => {
        const data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artID}`)
    }
)