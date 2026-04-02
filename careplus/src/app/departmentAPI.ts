import axiosInstance from "./axiosInstance";
import { AxiosResponse } from "axios";

type ID = string | number;
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
