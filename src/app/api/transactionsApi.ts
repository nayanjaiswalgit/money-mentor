import apiSlice from "../apiSlice";

export const transactionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => "/fintrack/transactions/",
    }),
  }),
});
export const { useGetTransactionsQuery } = transactionsApi;
