import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setPatients: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addPatient: (state, action) => {
      state.list.push(action.payload);
    },
    updatePatient: (state, action) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deletePatient: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setPatients,
  addPatient,
  updatePatient,
  deletePatient,
  setError,
} = patientsSlice.actions;
export default patientsSlice.reducer;
