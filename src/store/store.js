import { configureStore } from "@reduxjs/toolkit";
import { gastosSlice } from "./slices/gastosSlice";


export const store = configureStore({
    reducer: {
        gastos: gastosSlice.reducer,
    },
})