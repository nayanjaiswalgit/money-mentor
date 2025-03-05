import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import apiSlice from "./apiSlice";

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware

});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
