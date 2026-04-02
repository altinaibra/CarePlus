import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;
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
