import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface TypeOfAnalyses {
  id: number;
  name: string;
  description?: string;
  price: number;
  unit: string;
  status: boolean;
  userId?: string;
}

export const typesOfAnalysesAPI = {
  getAll: (): Promise<AxiosResponse<TypeOfAnalyses[]>> =>
    axiosInstance.get("/typesOfAnalyses"),
};
