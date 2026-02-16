import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createAppointment } from "./appointmentsSlice";
import { Doctor, fetchDoctors } from "../doctors/doctorsSlice";
import { fetchPatients } from "../patients/patientsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Patient } from "../../app/api";

interface AppointmentFormData {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  reason: string;
}

const AppointmentForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const doctors = useSelector(
    (state: RootState) => state.doctors.list,
  ) as Doctor[];

  const patients = useSelector(
    (state: RootState) => state.patients.list,
  ) as Patient[];

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  useEffect(() => {
    if (doctors.length === 0) dispatch(fetchDoctors());
    if (patients.length === 0) dispatch(fetchPatients());
  }, [dispatch, doctors.length, patients.length]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.patientId || !formData.doctorId) {
      alert("Please select both patient and doctor");
      return;
    }

    const appointmentDate = new Date(`${formData.date}T${formData.time}`);

    dispatch(
      createAppointment({
        PatientId: parseInt(formData.patientId),
        DoctorId: parseInt(formData.doctorId),
        AppointmentDate: appointmentDate.toISOString(),
        Date: new Date().toISOString(),
        Reason: formData.reason,
        Status: "Scheduled",
      }),
    );

    setFormData({
      patientId: "",
      doctorId: "",
      date: "",
      time: "",
      reason: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-5 mb-5 rounded-lg bg-white dark:[background-color:oklch(20.5%_0_0)] shadow-sm text-gray-900 dark:text-gray-100"
    >
      <h3 className="text-lg font-bold mb-4">{t("appointments.addNew")}</h3>

      <select
        name="patientId"
        value={formData.patientId}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-700"
      >
        <option value="">{t("appointments.selectPatient")}</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.firstName} {p.lastName}
          </option>
        ))}
      </select>

      <select
        name="doctorId"
        value={formData.doctorId}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-700"
      >
        <option value="">{t("appointments.selectDoctor")}</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            Dr. {d.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <textarea
        name="reason"
        placeholder={t("appointments.reason")}
        value={formData.reason}
        onChange={handleChange}
        required
        className="block mb-4 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
        style={{ minHeight: "80px" }}
      />

      <button
        type="submit"
        className="px-5 py-2 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white rounded cursor-pointer hover:bg-slate-800 transition font-semibold"
      >
        {t("appointments.addButton")}
      </button>
    </form>
  );
};

export default AppointmentForm;
