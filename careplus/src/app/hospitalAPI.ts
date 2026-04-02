import axiosInstance from "./axiosInstance";

type ID = string | number;
export interface Hospital {
  id: ID;
  name: string;
  address: string;
  city: string;
  businessNumber: string;
  email: string;
  phone: string;
}

export const hospitalAPI = {
  getAll: () => axiosInstance.get("/hospital"),
  getById: (id: ID) => axiosInstance.get(`/hospital/${id}`),
  create: (data: Omit<Hospital, "id">) => axiosInstance.post("/hospital", data),
  update: (id: ID, data: Partial<Hospital>) =>
    axiosInstance.put(`/hospital/${id}`, data),
  delete: (id: ID) => axiosInstance.delete(`/hospital/${id}`),
};
