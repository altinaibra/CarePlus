import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

type ID = string | number;
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
