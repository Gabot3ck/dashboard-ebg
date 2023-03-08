import { createSlice } from "@reduxjs/toolkit";


export const gastosSlice = createSlice({
    name: 'gastos',
    initialState: {
        page: 0,
        gastos: [],
        isLoading: false,
    },
    reducers: {
        startLoadingGastos: (state) =>{
            state.isLoading = true;
        },
        setGastos: ( state, action ) => {
            console.log(action);
        }
    }
})

export const { startLoadingGastos, setGastos } = gastosSlice.actions;
