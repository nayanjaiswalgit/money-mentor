import { combineReducers } from '@reduxjs/toolkit'
import apiSlice from './apiSlice'
import { userApi } from './api/userApi'

export const rootReducer = combineReducers(
    {
        [apiSlice.reducerPath]: apiSlice.reducer, 
        userApi: userApi.reducer, 
    })

export type RootState = ReturnType<typeof rootReducer>