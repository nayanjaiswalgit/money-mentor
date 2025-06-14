import { combineReducers } from '@reduxjs/toolkit'
import apiSlice from './apiSlice'
import { userApi } from './api/userApi'
import authReducer from '../features/auth/authSlice'

export const rootReducer = combineReducers(
    {
        [apiSlice.reducerPath]: apiSlice.reducer, 
        userApi: userApi.reducer, 
        auth: authReducer,
    })

export type RootState = ReturnType<typeof rootReducer>