import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './slice/customer'
import AnnounceReducer from './slice/Announce'
import ProductsReducer from './slice/Products'
import CartReducer from './slice/Cart'
export const store = configureStore({
    reducer: {
        customer: customerReducer,
        announce: AnnounceReducer,
        products: ProductsReducer,
        cart: CartReducer,
    },
})