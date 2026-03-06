import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { appointmentAPI, Appointment, Patient, Doctor } from "../../app/api";

type ID = string | number;

// FETCH
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

// CREATE
export const createAppointment = createAsyncThunk<
  Appointment,
  Omit<Appointment, "id" | "patient" | "doctor">,
  { rejectValue: string; state: any }
>(
  "appointments/createAppointment",
  async (appointmentData, { rejectWithValue, getState }) => {
    try {
      const response = await appointmentAPI.create(appointmentData);

      // Attach patient & doctor objects from Redux state
      const state = getState();
      const patient: Patient | undefined = state.patients.list.find(
        (p: Patient) => p.id === response.data.PatientId,
      );
      const doctor: Doctor | undefined = state.doctors.list.find(
        (d: Doctor) => d.id === response.data.DoctorId,
      );

      return { ...response.data, patient, doctor };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating appointment",
      );
    }
  },
);

// DELETE
export const deleteAppointmentAsync = createAsyncThunk<
  ID,
  ID,
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
      .addCase(deleteAppointmentAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.payload);
      });
  },
});

export const { clearError } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
