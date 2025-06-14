import apiSlice from "../../app/apiSlice";


interface LoginResponse  {
    access: string;
    refresh: string;
    
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

export const authAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials : LoginCredentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        localStorage.setItem("refresh", response.refresh);
        localStorage.setItem("access", response.access);
        return response;
      },

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(apiSlice.endpoints.getUserProfile.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authAPISlice;
