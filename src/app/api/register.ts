// DEPRECATED: All RTK Query usage removed. Use fetchApi and API_ENDPOINTS instead.

import { baseApi } from './baseApi';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

export const registerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: '/auth/register/',
        method: 'POST',
        body: credentials,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformErrorResponse: (response: any) => {
        if (response.status === 'PARSING_ERROR') {
          return {
            success: false,
            error: 'Server error. Please try again later.'
          };
        }
        // Handle DRF error response
        if (response.data) {
          return {
            success: false,
            error: response.data.error || response.data.detail || 'Registration failed'
          };
        }
        return {
          success: false,
          error: 'Registration failed'
        };
      },
    }),
  }),
});

export const { useRegisterMutation } = registerApi; 