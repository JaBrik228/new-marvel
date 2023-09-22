import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChar: null
}

const mainPageSlice = createSlice({
    name: 'selectedChar',
    initialState,
    reducers: {
        setSelectedChar: (state, action) => {
            state.selectedChar = action.payload;
        }
    }
});

const {actions, reducer} = mainPageSlice;

export default reducer;
export const {setSelectedChar} = actions;