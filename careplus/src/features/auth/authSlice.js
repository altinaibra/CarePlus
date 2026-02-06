import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null, // 'doctor', 'nurse', 'admin'
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoggedIn = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { login, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
