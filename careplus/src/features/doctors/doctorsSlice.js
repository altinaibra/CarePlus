import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setDoctors: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addDoctor: (state, action) => {
      state.list.push(action.payload);
    },
    updateDoctor: (state, action) => {
      const index = state.list.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteDoctor: (state, action) => {
      state.list = state.list.filter((d) => d.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  setError,
} = doctorsSlice.actions;
export default doctorsSlice.reducer;
