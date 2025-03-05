import apiSlice from "../apiSlice";

export const statementsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatements: builder.query({
      query: () => "/fintrack/statements/",
    }),
    uploadStatement: builder.mutation({
      query: (statement) => ({
        url: "/fintrack/statements/",
        method: "POST",
        body: statement,
      }),
    }),
  }),
});
export const { useGetStatementsQuery, useUploadStatementMutation } = statementsApi;
