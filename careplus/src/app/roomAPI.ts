import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

type ID = string | number;
// ----- ROOMS -----
export interface Room {
  id: ID;
  roomNumber: string;
  departmentId?: ID;
  totalBeds: number;
  availableBeds: number;
  occupiedBeds: number;
}

export const roomAPI = {
  getAll: (): Promise<AxiosResponse<Room[]>> => axiosInstance.get("/rooms"),

  getById: (id: ID): Promise<AxiosResponse<Room>> =>
    axiosInstance.get(`/rooms/${id}`),

  create: (data: Omit<Room, "id">): Promise<AxiosResponse<Room>> =>
    axiosInstance.post("/rooms", data),

  update: (id: ID, data: Partial<Room>): Promise<AxiosResponse<Room>> =>
    axiosInstance.put(`/rooms/${id}`, data),

  delete: (id: ID): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/rooms/${id}`),
};
