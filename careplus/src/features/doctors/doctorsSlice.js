import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doctorAPI } from "../../app/api";

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching doctors",
      );
    }
  },
);

export const createDoctor = createAsyncThunk(
  "doctors/createDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await doctorAPI.create(doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating doctor",
      );
    }
  },
);

export const deleteDoctorAsync = createAsyncThunk(
  "doctors/deleteDoctor",
  async (id, { rejectWithValue }) => {
    try {
      await doctorAPI.delete(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting doctor",
      );
    }
  },
);

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteDoctorAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export const { clearError } = doctorsSlice.actions;
export default doctorsSlice.reducer;
