import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;

export interface Nurse {
  id: ID;
  name: string;
  email?: string;
  phone?: string;
  licenseNumber?: string;
  departmentId?: number;
}

export const nurseAPI = {
  getById: (id: ID): Promise<AxiosResponse<Nurse>> =>
    axiosInstance.get(`/nurses/${id}`),
  update: (id: ID, data: Partial<Nurse>): Promise<AxiosResponse<Nurse>> =>
    axiosInstance.put(`/nurses/${id}`, data),
};
