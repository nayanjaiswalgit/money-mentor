import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get CSRF token from cookies
function getCSRFToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    credentials: 'include', // Important for cookies
    prepareHeaders: (headers) => {
      // Get CSRF token
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        headers.set('X-CSRFToken', csrfToken);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: () => ({}),
}); 