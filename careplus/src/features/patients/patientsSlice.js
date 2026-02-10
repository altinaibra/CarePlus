import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientAPI } from "../../app/api";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await patientAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching patients",
      );
    }
  },
);

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (patientData, { rejectWithValue }) => {
    try {
      const response = await patientAPI.create(patientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating patient",
      );
    }
  },
);

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatient",
  async (id, { rejectWithValue }) => {
    try {
      await patientAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting patient",
      );
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePatientAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearError } = patientsSlice.actions;
export default patientsSlice.reducer;
