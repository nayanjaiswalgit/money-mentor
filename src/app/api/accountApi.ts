import apiSlice from "../apiSlice";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => "/fintrack/accounts",
    }),
    createAccount: builder.mutation({
      query: (body) => ({
        url: "/fintrack/accounts/",
        method: "POST",
        body,
      }),
    }),
    getBankNames: builder.query({
      query: () => "/fintrack/bank-names/",
    }),
  }),
});
export const { useGetAccountQuery, useCreateAccountMutation, useGetBankNamesQuery } = accountApi;
  