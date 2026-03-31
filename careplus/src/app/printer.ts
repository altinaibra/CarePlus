import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

type ID = string | number;
// ----- PRINTERS -----
export interface Printer {
  printerId: number;
  printerName: string;
  printerDescription: string;
  defaultPrinter: boolean;
  entryDate: string;
  online?: boolean;
}

export interface LabReportItem {
  name: string;
  price: number;
  unit: string;
}

export interface LabReportPrintRequest {
  title?: string;
  currency: string;
  totalPrice: number;
  selectedLabs: LabReportItem[];
}

export interface PrescriptionPrintRequest {
  patientName: string;
  patientAge: number;
  patientGender: string;
  hasAllergies: boolean;
  allergies?: string;
  diagnosis: string;
  prescription: string;
  doctorSignature: string;
  printDate?: string;
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

  printLabReport: (data: LabReportPrintRequest): Promise<AxiosResponse<void>> =>
    axiosInstance.post("/Printer/PrintLabReport", data),

  printPrescription: (
    data: PrescriptionPrintRequest,
  ): Promise<AxiosResponse<void>> =>
    axiosInstance.post("/Printer/PrintPrescription", data),
};
