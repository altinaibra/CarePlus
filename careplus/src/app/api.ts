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
export interface Appointment {
  id: ID;
  PatientId: ID;
  DoctorId: ID;
  AppointmentDate: string;
  Date: string;
  Reason: string;
  Status: "Scheduled" | "Completed" | "Cancelled";
}

export const appointmentAPI = {
  getAll: (): Promise<AxiosResponse<Appointment[]>> =>
    axiosInstance.get("/appointments"),
  getById: (id: ID): Promise<AxiosResponse<Appointment>> =>
    axiosInstance.get(`/appointments/${id}`),
  create: (
    data: Omit<Appointment, "id">,
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
