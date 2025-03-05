import apiSlice from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "auth/profile",
    }),
  }),
});

export const { useGetUserProfileQuery } = userApi;
