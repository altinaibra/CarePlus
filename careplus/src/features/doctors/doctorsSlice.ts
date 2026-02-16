import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doctorAPI } from "../../app/api";

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  email: string;
  phone: string;
  licenseNumber: string;
}

interface APIDoctor {
  id: number | string;
  firstName: string;
  lastName: string;
  specialty?: string;
  email?: string;
  phone?: string;
  license_number?: string;
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

const mapDoctorFromAPI = (d: APIDoctor): Doctor => ({
  id: Number(d.id),
  name: `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim(),
  speciality: d.specialty ?? "",
  email: d.email ?? "",
  phone: d.phone ?? "",
  licenseNumber: d.license_number ?? "",
});

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

export const createDoctor = createAsyncThunk<
  Doctor,
  {
    name: string;
    speciality: string;
    email: string;
    phone: string;
    licenseNumber: string;
    password: string;
  },
  { rejectValue: string }
>("doctors/createDoctor", async (doctorData, { rejectWithValue }) => {
  try {
    // split name into first + last
    const nameParts = doctorData.name.trim().split(" ");

    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") ?? "";

    const response = await doctorAPI.create({
      firstName,
      lastName,
      specialty: doctorData.speciality,
      email: doctorData.email,
      phone: doctorData.phone,
      license_number: doctorData.licenseNumber,
      password: doctorData.password,
    });

    return mapDoctorFromAPI(response.data);
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Error creating doctor",
    );
  }
});

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

      .addCase(deleteDoctorAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((d) => d.id !== action.payload);
      });
  },
});

export const { clearError } = doctorsSlice.actions;
export default doctorsSlice.reducer;
