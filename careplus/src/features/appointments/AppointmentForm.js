import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createAppointment } from "./appointmentsSlice";

const AppointmentForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
    time: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createAppointment({
        patientName: formData.patientName,
        doctorName: formData.doctorName,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
      }),
    );
    setFormData({
      patientName: "",
      doctorName: "",
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
      <input
        type="text"
        name="patientName"
        placeholder={t("appointments.patient")}
        value={formData.patientName}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <input
        type="text"
        name="doctorName"
        placeholder={t("appointments.doctor")}
        value={formData.doctorName}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
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
        className="px-5 py-2 bg-slate-700 text-white rounded cursor-pointer hover:bg-slate-800 transition font-semibold"
      >
        {t("appointments.addButton")}
      </button>
    </form>
  );
};

export default AppointmentForm;
