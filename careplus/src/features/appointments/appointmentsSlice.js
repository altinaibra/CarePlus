import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { appointmentAPI } from "../../app/api";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching appointments",
      );
    }
  },
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.create(appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating appointment",
      );
    }
  },
);

export const deleteAppointmentAsync = createAsyncThunk(
  "appointments/deleteAppointment",
  async (id, { rejectWithValue }) => {
    try {
      await appointmentAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting appointment",
      );
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAppointmentAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.payload);
      });
  },
});

export const { clearError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
