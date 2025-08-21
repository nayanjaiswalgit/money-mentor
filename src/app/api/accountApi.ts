// DEPRECATED: All RTK Query usage removed. Use fetchApi and API_ENDPOINTS instead.

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'investment' | 'visa' | 'mastercard' | 'amex';
  balance: number;
  currency?: string; 
  institution: string;
  limit?: number; 
  due_date?: string; 
}

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<PaginatedResponse<Account>, void>({
      query: () => 'finance/accounts/',
      providesTags: (result) =>
        result
          ? [
              ...result.results.map(({ id }) => ({ type: 'Account' as const, id })),
              { type: 'Account', id: 'LIST' },
            ]
          : [{ type: 'Account', id: 'LIST' }],
    }),
    getAccountById: builder.query<Account, string>({
      query: (id) => `finance/accounts/${id}/`,
      providesTags: (result, error, id) => [{ type: 'Account', id }],
    }),
    createAccount: builder.mutation<Account, Partial<Account>>({
      query: (newAccount) => ({
        url: 'finance/accounts/',
        method: 'POST',
        body: newAccount,
      }),
      invalidatesTags: [{ type: 'Account', id: 'LIST' }],
    }),
    updateAccount: builder.mutation<Account, { id: string; data: Partial<Account> }> ({
      query: ({ id, data }) => ({
        url: `finance/accounts/${id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Account', id }],
    }),
    deleteAccount: builder.mutation<void, string>({
      query: (id) => ({
        url: `finance/accounts/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Account', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountByIdQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountApiSlice;
  