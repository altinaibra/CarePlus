import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface Currency {
  currencyId: number;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  exchangeRate: number;
  status: boolean;
  isMainCurrency: boolean;
  entryDate: string;
}

export const currencyAPI = {
  getAll: (): Promise<AxiosResponse<Currency[]>> =>
    axiosInstance.get("/currencies"),
};
