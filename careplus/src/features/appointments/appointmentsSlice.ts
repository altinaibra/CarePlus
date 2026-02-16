import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { appointmentAPI, Appointment, } from "../../app/api";

type ID = string | number;

export const fetchAppointments = createAsyncThunk<
  Appointment[],
  void,
  { rejectValue: string }
>("appointments/fetchAppointments", async (_, { rejectWithValue }) => {
  try {
    const response = await appointmentAPI.getAll();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error fetching appointments",
    );
  }
});

// Create appointment
export const createAppointment = createAsyncThunk<
  Appointment,
  Omit<Appointment, "id">,
  { rejectValue: string }
>(
  "appointments/createAppointment",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await appointmentAPI.create(appointmentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating appointment",
      );
    }
  },
);

// Delete appointment
export const deleteAppointmentAsync = createAsyncThunk<
  string | number,
  string | number,
  { rejectValue: string }
>("appointments/deleteAppointment", async (id, { rejectWithValue }) => {
  try {
    await appointmentAPI.delete(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error deleting appointment",
    );
  }
});

// Slice state type
interface AppointmentsState {
  list: Appointment[];
  loading: boolean;
  error: string | null;
}

const initialState: AppointmentsState = {
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
      .addCase(
        fetchAppointments.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.loading = false;
          state.list.push(action.payload);
        },
      )
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        deleteAppointmentAsync.fulfilled,
        (state, action: PayloadAction<ID>) => {
          state.list = state.list.filter((a) => a.id !== action.payload);
        },
      );
  },
});

export const { clearError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
