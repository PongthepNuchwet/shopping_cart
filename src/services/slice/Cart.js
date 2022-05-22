import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'


export const Cart = createSlice({
    name: 'Cart',
    initialState: {
        Items: [],
    },
    reducers: {
        AddItem: (state, { payload }) => {
            if (state.Items.length < 1) {
                state.Items.push({
                    product_id: payload.product_id,
                    purchasedAmount: Number(payload.purchasedAmount)
                })
            } else {
                let find = null
                for (let i = 0; i < state.Items.length; i++) {
                    if (state.Items[i].product_id === payload.product_id) {
                        find = i
                        break;
                    }
                }
                if (find !== null) {
                    state.Items[find].purchasedAmount += Number(payload.purchasedAmount)
                } else {
                    state.Items.push({
                        product_id: payload.product_id,
                        purchasedAmount: Number(payload.purchasedAmount)
                    })
                }
            }
        },
        RemoveItem: (state, { payload }) => {
            delete state.data[payload.key]
        },
        EditeItem: (state, { payload }) => {

        },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


export const { AddItem, RemoveItem, EditeItem } = Cart.actions

export default Cart.reducer