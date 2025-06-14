import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, LoginCredentials, RegisterData } from '../../types/auth';
import authService from './authService';
import NotFoundPage from './pages/NotFoundPage';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  initialized: false
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(data);
      return response.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to check auth status');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
      state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
        state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
      state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
      state.loading = false;
        state.error = action.payload as string;
      })
      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
      state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
      state.loading = false;
        state.initialized = true;
        state.isAuthenticated = !!action.payload;
      state.user = action.payload;
      state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
      state.loading = false;
        state.initialized = true;
      state.isAuthenticated = false;
      state.user = null;
        state.error = action.payload as string;
    });
  }
});

// Selectors
export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectAuthInitialized = (state: { auth: AuthState }) => state.auth.initialized;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
