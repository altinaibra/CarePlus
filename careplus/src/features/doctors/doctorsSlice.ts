import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doctorAPI, CreateDoctorDto } from "../../app/api";

// Frontend form type
export interface CreateDoctorForm {
  firstName: string;
  lastName: string;
  speciality: string; // match backend
  email: string;
  phone: string;
  licenseNumber: string; // match backend
  password: string;
}

// Frontend Doctor type
export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  speciality: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

// API Doctor type
interface APIDoctor {
  id: number | string;
  firstName: string;
  lastName: string;
  speciality?: string;
  email?: string;
  phone?: string;
  licenseNumber?: string;
}

interface DoctorsState {
  list: Doctor[];
  loading: boolean;
  error: string | null;
}

const initialState: DoctorsState = {
  list: [],
  loading: false,
  error: null,
};

// Map backend API doctor to frontend Doctor
const mapDoctorFromAPI = (d: APIDoctor): Doctor => ({
  id: Number(d.id),
  firstName: d.firstName ?? "",
  lastName: d.lastName ?? "",
  name: `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim(),
  speciality: d.speciality ?? "",
  email: d.email ?? "",
  phone: d.phone ?? "",
  licenseNumber: d.licenseNumber ?? "",
});

// Fetch doctors
export const fetchDoctors = createAsyncThunk<
  Doctor[],
  void,
  { rejectValue: string }
>("doctors/fetchDoctors", async (_, { rejectWithValue }) => {
  try {
    const response = await doctorAPI.getAll();
    const doctors: APIDoctor[] = response.data ?? [];
    return doctors.map(mapDoctorFromAPI);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Error fetching doctors",
    );
  }
});

// Create doctor thunk
export const createDoctor = createAsyncThunk<
  Doctor,
  CreateDoctorForm,
  { rejectValue: string }
>("doctors/createDoctor", async (formData, { rejectWithValue }) => {
  try {
    // Map frontend form keys to backend keys
    const payload: CreateDoctorDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      speciality: formData.speciality.trim(),
      email: formData.email,
      phone: formData.phone,
      licenseNumber: formData.licenseNumber.trim(),
      password: formData.password,
    };

    const response = await doctorAPI.create(payload);
    return mapDoctorFromAPI(response.data);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Error creating doctor",
    );
  }
});

// Delete doctor thunk
export const deleteDoctorAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("doctors/deleteDoctor", async (id, { rejectWithValue }) => {
  try {
    await doctorAPI.delete(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Error deleting doctor",
    );
  }
});

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
      // Fetch doctors
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
        state.error = action.payload ?? "Unknown error";
      })

      // Create doctor
      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })

      // Delete doctor
      .addCase(deleteDoctorAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export const { clearError } = doctorsSlice.actions;
export default doctorsSlice.reducer;
