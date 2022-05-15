import { createSlice } from '@reduxjs/toolkit'



export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        uid: "",
        name: "",
        phone: "",
        address: "",
        role: ""
    },
    reducers: {
        setCustomer: (state, data) => {
            console.log("setCustomer: ", data.payload, data.payload.uid)
            state.uid = data.payload.uid
            state.name = data.payload.name
            state.phone = data.payload.phone
            state.address = data.payload.address
            state.role = data.payload.role
        },
        clear: (state) => {
            state.uid = ''
            state.name = ''
            state.phone = ''
            state.address = ''
            state.role = ''
        },

    },
})


export const { setCustomer, clear, } = customerSlice.actions

export default customerSlice.reducer