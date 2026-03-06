import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  username: string;
}

export const authAPI = {
  login: (credentials: LoginRequest): Promise<AxiosResponse<LoginResponse>> =>
    axiosInstance.post("/auth/login", credentials),
};

export interface Patient {
  id: ID;
  firstName: string;
  lastName: string;
  age?: number;
  email?: string;
  phone?: string;
}

export const patientAPI = {
  getAll: (): Promise<AxiosResponse<Patient[]>> =>
    axiosInstance.get("/patients"),
  getById: (id: ID): Promise<AxiosResponse<Patient>> =>
    axiosInstance.get(`/patients/${id}`),
  create: (data: Omit<Patient, "id">): Promise<AxiosResponse<Patient>> =>
    axiosInstance.post("/patients", data),
  update: (id: ID, data: Partial<Patient>): Promise<AxiosResponse<Patient>> =>
    axiosInstance.put(`/patients/${id}`, data),
  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/patients/${id}`),
};

// ----- DOCTORS -----
export interface APIDoctor {
  id: ID;
  firstName: string;
  lastName: string;
  specialty?: string;
  email?: string;
  phone?: string;
  license_number?: string;
}

export interface CreateDoctorDto {
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  phone: string;
  license_number: string;
  password: string;
}

export const doctorAPI = {
  getAll: (): Promise<AxiosResponse<APIDoctor[]>> =>
    axiosInstance.get("/doctors"),

  getById: (id: ID): Promise<AxiosResponse<APIDoctor>> =>
    axiosInstance.get(`/doctors/${id}`),

  create: (data: CreateDoctorDto): Promise<AxiosResponse<APIDoctor>> =>
    axiosInstance.post("/doctors", data),

  update: (
    id: ID,
    data: Partial<CreateDoctorDto>,
  ): Promise<AxiosResponse<APIDoctor>> =>
    axiosInstance.put(`/doctors/${id}`, data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/doctors/${id}`),
};

// ----- APPOINTMENTS -----
export interface Patient {
  id: ID;
  firstName: string;
  lastName: string;
}

export interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  speciality: string;
  email: string;
  phone: string;
  licenseNumber: string;
  password: string;
}

export interface Appointment {
  id: ID;
  PatientId: ID;
  DoctorId: ID;
  AppointmentDate: string;
  Date: string;
  Reason: string;
  Status: "Scheduled" | "Completed" | "Cancelled";

  // Optional related objects for frontend convenience
  patient?: Patient | null;
  doctor?: Doctor | null;
}

export const appointmentAPI = {
  getAll: (): Promise<AxiosResponse<Appointment[]>> =>
    axiosInstance.get("/appointments"),
  getById: (id: ID): Promise<AxiosResponse<Appointment>> =>
    axiosInstance.get(`/appointments/${id}`),
  create: (
    data: Omit<Appointment, "id" | "patient" | "doctor">,
  ): Promise<AxiosResponse<Appointment>> =>
    axiosInstance.post("/appointments", data),
  update: (
    id: ID,
    data: Partial<Appointment>,
  ): Promise<AxiosResponse<Appointment>> =>
    axiosInstance.put(`/appointments/${id}`, data),
  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/appointments/${id}`),
};
// ----- DEPARTMENTS -----
export interface Department {
  id: ID;
  name: string;
  description?: string;
}

export const departmentAPI = {
  getAll: (): Promise<AxiosResponse<Department[]>> =>
    axiosInstance.get("/departments"),
  getById: (id: ID): Promise<AxiosResponse<Department>> =>
    axiosInstance.get(`/departments/${id}`),
  create: (data: Omit<Department, "id">): Promise<AxiosResponse<Department>> =>
    axiosInstance.post("/departments", data),
  update: (
    id: ID,
    data: Partial<Department>,
  ): Promise<AxiosResponse<Department>> =>
    axiosInstance.put(`/departments/${id}`, data),
  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/departments/${id}`),
};

// ----- DEPARTMENT DETAILS -----

export interface DepartmentDetailsInfo {
  id: ID;
  departmentId: ID;
  shortDescription: string;
  services: string; // semicolon-separated list
  location: string;
  hours: string;
  phone: string;
  highlight1Label: string;
  highlight1Value: string;
  highlight2Label: string;
  highlight2Value: string;
}

export const departmentDetailsAPI = {
  getByDepartment: (
    departmentId: ID,
  ): Promise<AxiosResponse<DepartmentDetailsInfo>> =>
    axiosInstance.get(`/departmentdetails/by-department/${departmentId}`),
};

// ----- ROOMS -----
export interface Room {
  id: ID;
  roomNumber: string;
  departmentId: ID;
  totalBeds: number;
  availableBeds: number;
  occupiedBeds: number;
}

export const roomAPI = {
  getAll: (): Promise<AxiosResponse<Room[]>> => axiosInstance.get("/rooms"),

  getById: (id: ID): Promise<AxiosResponse<Room>> =>
    axiosInstance.get(`/rooms/${id}`),

  getByDepartment: (departmentId: ID): Promise<AxiosResponse<Room[]>> =>
    axiosInstance.get(`/rooms/department/${departmentId}`),

  create: (data: Omit<Room, "id">): Promise<AxiosResponse<Room>> =>
    axiosInstance.post("/rooms", data),

  update: (id: ID, data: Partial<Room>): Promise<AxiosResponse<Room>> =>
    axiosInstance.put(`/rooms/${id}`, data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/rooms/${id}`),
};

// ----- PRESCRIPTIONS -----

export interface Prescription {
  id: ID;
  patientName: string;
  patientAge: number;
  patientGender: string;
  hasAllergies: boolean;
  allergies?: string;
  createdAt?: string;
}

export interface CreatePrescriptionDto {
  patientName: string;
  patientAge: number;
  patientGender: string;
  hasAllergies: boolean;
  allergies?: string;
}

export const prescriptionAPI = {
  getAll: (): Promise<AxiosResponse<Prescription[]>> =>
    axiosInstance.get("/prescription"),

  getById: (id: ID): Promise<AxiosResponse<Prescription>> =>
    axiosInstance.get(`/prescription/${id}`),

  create: (data: CreatePrescriptionDto): Promise<AxiosResponse<Prescription>> =>
    axiosInstance.post("/prescription", data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/prescription/${id}`),
};
