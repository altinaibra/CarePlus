import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setAppointments: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    addAppointment: (state, action) => {
      state.list.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.list.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteAppointment: (state, action) => {
      state.list = state.list.filter((a) => a.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  setError,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
