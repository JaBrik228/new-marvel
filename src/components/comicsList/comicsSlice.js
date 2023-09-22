import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    scrollPos: 0, 
    comics: [], 
    offset: 0
};

const comicsSlice = createSlice({
    name: 'comics',
    initialState,
    reducers: {
        setScroll: (state, action) => {
            state.scrollPos = action.payload;
        },
        setComics: (state, action) => {
            state.comics = [...state.comics, ...action.payload];
        },
        setComicOffset: (state, action) => {
            state.offset = state.offset + action.payload;
        }
    }
});

const {actions, reducer} = comicsSlice;

export default reducer;
export const {setScroll, setComics, setComicOffset} = actions;