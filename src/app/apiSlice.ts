import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api",
  credentials: 'include', // Include cookies for session-based auth
});

const baseQueryWithErrorHandling: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // If unauthorized, redirect to login
    window.location.href = '/login';
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['User'],
  endpoints: () => ({}),
});

export default apiSlice;
