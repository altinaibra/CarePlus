import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;

export interface Laboratory {
  id: ID;
  name: string;
  description?: string;
  price: number;
  unit: string;
  status: boolean;
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
  getByUser: (userId: string): Promise<AxiosResponse<Laboratory>> =>
    axiosInstance.get(`/laboratory/${userId}`),
  toggleStatus: (
    data: ToggleLaboratoryDto,
  ): Promise<AxiosResponse<Laboratory>> =>
    axiosInstance.post(`/laboratory/toggle`, data),

  create: (data: CreateLaboratoryDto): Promise<AxiosResponse<Laboratory>> =>
    axiosInstance.post(`/laboratory/create`, data),

  getAll: (): Promise<AxiosResponse<Laboratory[]>> =>
    axiosInstance.get(`/laboratory/all`),
};
