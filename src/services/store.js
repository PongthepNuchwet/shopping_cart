import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './slice/customer'
import AnnounceReducer from './slice/Announce'
export const store = configureStore({
    reducer: {
        customer: customerReducer,
        announce: AnnounceReducer
    },
})