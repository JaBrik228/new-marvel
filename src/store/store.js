import { configureStore } from "@reduxjs/toolkit";
import comics from "../components/comicsList/comicsSlice";
import chars from "../components/charList/charsSlice";
import selectedChar from "../components/pages/mainPageSlice/mainPageSlice";

const store = configureStore({
    reducer: {comics, chars, selectedChar},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store;