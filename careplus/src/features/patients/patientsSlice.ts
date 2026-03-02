import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientAPI } from "../../app/api";
import type { PatientWithContact, PatientFormData } from "./types";

interface PatientsState {
  list: PatientWithContact[];
  loading: boolean;
  error: string | null;
}

const initialState: PatientsState = {
  list: [],
  loading: false,
  error: null,
};

// Fetch patients
export const fetchPatients = createAsyncThunk<
  PatientWithContact[],
  void,
  { rejectValue: string }
>("patients/fetchPatients", async (_, { rejectWithValue }) => {
  try {
    const response = await patientAPI.getAll();
    return response.data.map((p: any) => ({
      id: Number(p.id),
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email || "",
      contact: p.contact,
      age: p.age ? String(p.age) : undefined,
      gender: p.gender,
      address: p.address,
      dateOfBirth: p.dateOfBirth,
    }));
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error fetching patients",
    );
  }
});

// Create a single patient
export const createPatient = createAsyncThunk<
  PatientWithContact,
  PatientFormData,
  { rejectValue: string }
>("patients/createPatient", async (patientData, { rejectWithValue }) => {
  try {
    const apiPayload = {
      ...patientData,
      age: patientData.age ? Number(patientData.age) : undefined,
    };

    const response = await patientAPI.create(apiPayload);
    const data = response.data as any;

    const patient: PatientWithContact = {
      id: Number(data.id),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || "",
      contact: data.contact,
      age: data.age ? String(data.age) : undefined,
      gender: data.gender,
      address: data.address,
      dateOfBirth: data.dateOfBirth || "",
    };

    return patient;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error creating patient",
    );
  }
});

// Delete patient
export const deletePatientAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("patients/deletePatient", async (id, { rejectWithValue }) => {
  try {
    await patientAPI.delete(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Error deleting patient",
    );
  }
});

// ------------------ Slice ------------------

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
      // Fetch patients
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
        state.error = action.payload
          ? (action.payload as string)
          : action.error.message || "Unknown error";
      })

      // Create patient
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })

      // Delete patient
      .addCase(deletePatientAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      })
      .addCase(deletePatientAsync.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error deleting patient";
      });
  },
});

export const { clearError } = patientsSlice.actions;
export default patientsSlice.reducer;
