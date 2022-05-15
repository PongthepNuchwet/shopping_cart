import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'


export const Announce = createSlice({
    name: 'customer',
    initialState: {
        action: 'ACTION_CREATE',
        progress: 0,
        image: null,
        imageUrl: null,
        Title: '',
        Desc: '',
        data: {},
        key: null
    },
    reducers: {
        setKey: (state, { payload }) => {
            state.key = payload
        },
        setData: (state, { payload }) => {
            state.data[payload.key] = payload.data
        },
        RemoveData: (state, { payload }) => {
            delete state.data[payload.key]
        },
        test: (state, payload) => {
            payload.res = state.id
        },
        setProgress: (state, { payload }) => {
            state.progress = payload
        },
        setImage: (state, { payload }) => {
            state.image = payload
        },
        setImageUrl: (state, { payload }) => {
            state.imageUrl = payload
        },
        setTitle: (state, { payload }) => {
            state.Title = payload
        },
        setDesc: (state, { payload }) => {
            state.Desc = payload
        },
        setAction: (state, { payload }) => {
            state.action = payload
        },
        reset: (state, { payload }) => {
            state.progress = 0
            state.image = null
            state.imageUrl = null
            state.Title = ''
            state.Desc = ''
            state.action = 'ACTION_CREATE'
            state.key = null
        },
        Edite: (state, { payload }) => {
            console.log("payload", payload, state.data[payload.key], payload.key)
            // return state.data[payload.key]
        },
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})


export const { RemoveData, setKey, setAction, Edite, setData, reset, test, setProgress, setImage, setImageUrl, setTitle, setDesc } = Announce.actions

export default Announce.reducer