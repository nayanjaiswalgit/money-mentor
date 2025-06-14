import apiSlice from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "auth/me",
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;
