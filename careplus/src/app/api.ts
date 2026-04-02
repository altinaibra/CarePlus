import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  profileId: number;
  username: string;
  role: string;
  token: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface ChangePasswordRequest {
  username: string;
  currentPassword: string;
  newPassword: string;
}
export const authAPI = {
  login: (credentials: LoginRequest): Promise<AxiosResponse<LoginResponse>> =>
    axiosInstance.post("/auth/login", credentials),

  changePassword: (data: ChangePasswordRequest): Promise<AxiosResponse<void>> =>
    axiosInstance.post("/auth/change-password", data),
  getUser: (id: ID): Promise<AxiosResponse<AuthUser>> =>
    axiosInstance.get(`/auth/user/${id}`),
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
  speciality?: string;
  email?: string;
  phone?: string;
  licenseNumber?: string;
}

export interface CreateDoctorDto {
  firstName: string;
  lastName: string;
  speciality: string;
  email: string;
  phone: string;
  licenseNumber: string;
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

export interface Admin {
  id: ID;
  name: string;
  email?: string;
  phone?: string;
}

export const adminAPI = {
  getById: (id: ID): Promise<AxiosResponse<Admin>> =>
    axiosInstance.get(`/administrators/${id}`),

  update: (id: ID, data: Partial<Admin>): Promise<AxiosResponse<Admin>> =>
    axiosInstance.put(`/administrators/${id}`, data),
};

// ----- PRINTERS -----
export interface Printer {
  printerId: number;
  printerName: string;
  printerDescription: string;
  defaultPrinter: boolean;
  entryDate: string;
  online?: boolean;
}

export const printerAPI = {
  getAll: (): Promise<AxiosResponse<Printer[]>> =>
    axiosInstance.get("/Printer"),

  getById: (id: ID): Promise<AxiosResponse<Printer>> =>
    axiosInstance.get(`/Printer/${id}`),

  create: (data: Omit<Printer, "printerId">): Promise<AxiosResponse<Printer>> =>
    axiosInstance.post("/Printer", data),

  update: (id: ID, data: Partial<Printer>): Promise<AxiosResponse<Printer>> =>
    axiosInstance.put(`/Printer/${id}`, data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/Printer/${id}`),
};
