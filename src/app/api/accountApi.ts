import apiSlice from "../apiSlice";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => "/fintrack/accounts",
    }),
  }),
});
export const { useGetAccountQuery } = accountApi;
