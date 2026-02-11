import axiosInstance from "../app/axiosInstance";

// PATIENTS
export const patientAPI = {
  getAll: () => axiosInstance.get("/patients"),
  getById: (id) => axiosInstance.get(`/patients/${id}`),
  create: (data) => axiosInstance.post("/patients", data),
  update: (id, data) => axiosInstance.put(`/patients/${id}`, data),
  delete: (id) => axiosInstance.delete(`/patients/${id}`),
};

// DOCTORS
export const doctorAPI = {
  getAll: () => axiosInstance.get("/doctors"),
  getById: (id) => axiosInstance.get(`/doctors/${id}`),
  create: (data) => axiosInstance.post("/doctors", data),
  update: (id, data) => axiosInstance.put(`/doctors/${id}`, data),
  delete: (id) => axiosInstance.delete(`/doctors/${id}`),
};

// APPOINTMENTS
export const appointmentAPI = {
  getAll: () => axiosInstance.get("/appointments"),
  getById: (id) => axiosInstance.get(`/appointments/${id}`),
  create: (data) => axiosInstance.post("/appointments", data),
  update: (id, data) => axiosInstance.put(`/appointments/${id}`, data),
  delete: (id) => axiosInstance.delete(`/appointments/${id}`),
};


// DEPARTMENTS
export const departmentAPI = {
  getAll: () => axiosInstance.get("/departments"), // assuming your endpoint is /departments
  getById: (id) => axiosInstance.get(`/departments/${id}`),
  create: (data) => axiosInstance.post("/departments", data),
  update: (id, data) => axiosInstance.put(`/departments/${id}`, data),
  delete: (id) => axiosInstance.delete(`/departments/${id}`),
};

// AUTH
export const authAPI = {
  login: (credentials) => axiosInstance.post("/auth/login", credentials),
};
