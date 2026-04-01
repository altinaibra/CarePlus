import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface NotificationTemplate {
  id: number;
  title: string;
  channel: "Email" | "SMS" | "In-App";
  message: string;
  isActive: boolean;
}

export interface FinancialSetting {
  id: number;
  taxRate: number;
  currencyCode: string;
  invoicePrefix: string;
  nextInvoiceNumber: number;
}

export interface BackupSetting {
  id: number;
  autoBackupEnabled: boolean;
  backupInterval: string;
  lastBackupAt: string | null;
}

export interface AuditLog {
  id: number;
  username: string;
  action: string;
  target: string;
  createdAt: string;
}

export interface IntegrationSetting {
  id: number;
  name: string;
  enabled: boolean;
  apiKey: string;
}

export interface SystemNotification {
  id: number;
  title: string;
  createdBy: string;
  createdAt: string;
  isGlobal: boolean;
  isActive: boolean;
}

export const notificationTemplatesAPI = {
  getAll: (): Promise<AxiosResponse<NotificationTemplate[]>> =>
    axiosInstance.get("/notificationtemplates"),
  create: (
    data: Omit<NotificationTemplate, "id">,
  ): Promise<AxiosResponse<NotificationTemplate>> =>
    axiosInstance.post("/notificationtemplates", data),
  update: (
    id: number,
    data: Omit<NotificationTemplate, "id">,
  ): Promise<AxiosResponse<NotificationTemplate>> =>
    axiosInstance.put(`/notificationtemplates/${id}`, data),
  delete: (id: number): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/notificationtemplates/${id}`),
};

export const financialSettingsAPI = {
  get: (): Promise<AxiosResponse<FinancialSetting>> =>
    axiosInstance.get("/financialsettings"),
  save: (
    data: Omit<FinancialSetting, "id">,
  ): Promise<AxiosResponse<FinancialSetting>> =>
    axiosInstance.put("/financialsettings", data),
};

export const backupSettingsAPI = {
  get: (): Promise<AxiosResponse<BackupSetting>> =>
    axiosInstance.get("/backupsettings"),
  save: (
    data: Pick<BackupSetting, "autoBackupEnabled" | "backupInterval">,
  ): Promise<AxiosResponse<BackupSetting>> => axiosInstance.put("/backupsettings", data),
  manual: (): Promise<AxiosResponse<BackupSetting>> =>
    axiosInstance.post("/backupsettings/manual"),
};

export const auditLogsAPI = {
  getAll: (take = 100): Promise<AxiosResponse<AuditLog[]>> =>
    axiosInstance.get(`/auditlogs?take=${take}`),
};

export const integrationsAPI = {
  getAll: (): Promise<AxiosResponse<IntegrationSetting[]>> =>
    axiosInstance.get("/integrations"),
  update: (
    id: number,
    data: Omit<IntegrationSetting, "id">,
  ): Promise<AxiosResponse<IntegrationSetting>> =>
    axiosInstance.put(`/integrations/${id}`, data),
};

export const notificationsAPI = {
  getAll: (): Promise<AxiosResponse<SystemNotification[]>> =>
    axiosInstance.get("/notifications"),
  create: (
    title: string,
  ): Promise<AxiosResponse<SystemNotification>> =>
    axiosInstance.post("/notifications", { title }),
};
