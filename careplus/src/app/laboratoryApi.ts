import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;

export interface Laboratory {
  id: ID;
  name: string;
  description?: string;
  price: number;
  unit: string;
  status: boolean; // ON/OFF
  userId?: string;
}

export interface ToggleLaboratoryDto {
  userId: string;
  status: boolean;
}

export interface CreateLaboratoryDto {
  name: string;
  description?: string;
  price: number;
  unit: string;
  status: boolean;
  userId?: string;
}

export const laboratoryAPI = {
  // Merr laboratorin për përdoruesin
  getByUser: (userId: string): Promise<AxiosResponse<Laboratory>> =>
    axiosInstance.get(`/laboratory/${userId}`),

  // Toggle ON/OFF për laborator
  toggleStatus: (
    data: ToggleLaboratoryDto,
  ): Promise<AxiosResponse<Laboratory>> =>
    axiosInstance.post(`/laboratory/toggle`, data),

  // Krijo laborator të ri
  create: (data: CreateLaboratoryDto): Promise<AxiosResponse<Laboratory>> =>
    axiosInstance.post(`/laboratory/create`, data),

  // Merr të gjithë laboratorët (për admin view)
  getAll: (): Promise<AxiosResponse<Laboratory[]>> =>
    axiosInstance.get(`/laboratory/all`),
};
