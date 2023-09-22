import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offset: 210,
    chars: [],
};

const charsSlice = createSlice({
    name: 'chars',
    initialState,
    reducers: {
        setChar: (state, action) => {
            state.chars = [...state.chars, ...action.payload];
        },
        setOffset: (state, action) => {
            state.offset = state.offset + action.payload;
        }
    }
});

const {actions, reducer} = charsSlice;

export default reducer;
export const {setChar, setOffset} = actions;