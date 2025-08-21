import apiSlice from "../../app/apiSlice";

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    user: {
      id: string;
      username: string;
      email: string;
      first_name?: string;
      last_name?: string;
    }
  };
  error?: string;
}

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export const authAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login/",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        if (response.success && response.data?.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response;
      },
    }),
    getUserProfile: builder.query<UserProfile | null, void>({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: any) => {
        if (response.success && response.data?.user) {
          return response.data.user;
        }
        return null;
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout/",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("user");
          dispatch(authAPISlice.util.invalidateTags(["User"]));
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const { 
  useLoginMutation,
  useGetUserProfileQuery,
  useLogoutMutation,
} = authAPISlice;
