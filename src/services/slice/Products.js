import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'


export const Products = createSlice({
    name: 'products',
    initialState: {
        data: {},
    },
    reducers: {
        setData: (state, { payload }) => {
            state.data[payload.key] = payload.data
        },
        RemoveData: (state, { payload }) => {
            delete state.data[payload.key]
        },
        Edite: (state, { payload }) => {

        },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


export const { setData, RemoveData } = Products.actions

export default Products.reducer