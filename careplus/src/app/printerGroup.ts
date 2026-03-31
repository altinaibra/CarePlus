import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

type ID = string | number;
// ----- PRINTER GROUPS -----
export interface PrinterGroup {
  printerGroupId: number;
  groupDescription: string;
  printerId?: number;
  entryDate: string;
}

export const printerGroupAPI = {
  getAll: (): Promise<AxiosResponse<PrinterGroup[]>> =>
    axiosInstance.get("/PrinterGroups"),

  getById: (id: ID): Promise<AxiosResponse<PrinterGroup>> =>
    axiosInstance.get(`/PrinterGroups/${id}`),

  create: (
    data: Omit<PrinterGroup, "printerGroupId">,
  ): Promise<AxiosResponse<PrinterGroup>> =>
    axiosInstance.post("/PrinterGroups", data),

  update: (
    id: ID,
    data: Partial<PrinterGroup>,
  ): Promise<AxiosResponse<PrinterGroup>> =>
    axiosInstance.put(`/PrinterGroups/${id}`, data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/PrinterGroups/${id}`),
};
