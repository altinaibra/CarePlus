import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

type ID = string | number;

export interface Holiday {
  id: ID;
  name: string;
  date: string;
  comment?: string;
}

export const holidayAPI = {
  getAll: (): Promise<AxiosResponse<Holiday[]>> =>
    axiosInstance.get("/holidays"),

  getById: (id: ID): Promise<AxiosResponse<Holiday>> =>
    axiosInstance.get(`/holidays/${id}`),

  create: (data: Omit<Holiday, "id">): Promise<AxiosResponse<Holiday>> =>
    axiosInstance.post("/holidays", data),

  update: (id: ID, data: Partial<Holiday>): Promise<AxiosResponse<Holiday>> =>
    axiosInstance.put(`/holidays/${id}`, data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/holidays/${id}`),
};
