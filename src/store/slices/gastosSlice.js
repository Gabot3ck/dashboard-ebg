import { createSlice } from "@reduxjs/toolkit";


export const gastosSlice = createSlice({
    name: 'gasto',
    initialState: {
        gastos: [],
        isLoading: false,
    },
    reducers: {
        startLoadingGastos: (state) =>{
            state.isLoading = true;
        },
        setGastos: ( state, action ) => {
            state.isLoading = false;
            state.gastos = action.payload.gastos;
        }
    }
})

export const { startLoadingGastos, setGastos } = gastosSlice.actions;
