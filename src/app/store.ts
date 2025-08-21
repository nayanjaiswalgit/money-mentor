import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import apiSlice from "./apiSlice";
// import { accountApiSlice } from "./api/accountApi"; // No longer needed as it's injected

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // apiSlice now handles all injected middlewares

});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
