import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  role: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

// Hydrate initial state from localStorage
const initialState: AuthState = {
  user: localStorage.getItem("username") || null,
  role: localStorage.getItem("userRole") || null,
  isLoggedIn: !!localStorage.getItem("authToken"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: string; role: string; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;

      localStorage.setItem("username", action.payload.user);
      localStorage.setItem("userRole", action.payload.role);
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("username");
      localStorage.removeItem("userRole");
      localStorage.removeItem("authToken");
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
