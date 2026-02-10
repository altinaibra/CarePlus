import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { createPatient } from "./patientsSlice";

const PatientForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
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
      createPatient({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        address: formData.address,
      }),
    );
    setFormData({ name: "", email: "", phone: "", age: "", address: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-5 mb-5 rounded-lg bg-white dark:[background-color:oklch(20.5%_0_0)] shadow-sm text-gray-900 dark:text-gray-100"
    >
      <h3 className="text-lg font-bold mb-4">{t("patients.addNew")}</h3>
      <input
        type="text"
        name="name"
        placeholder={t("patients.name")}
        value={formData.name}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <input
        type="email"
        name="email"
        placeholder={t("patients.email")}
        value={formData.email}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <input
        type="tel"
        name="phone"
        placeholder={t("patients.phone")}
        value={formData.phone}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <input
        type="number"
        name="age"
        placeholder={t("patients.age")}
        value={formData.age}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <input
        type="text"
        name="address"
        placeholder={t("patients.address")}
        value={formData.address}
        onChange={handleChange}
        required
        className="block mb-4 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-slate-700 text-white rounded cursor-pointer hover:bg-slate-800 transition font-semibold"
      >
        {t("patients.addButton")}
      </button>
    </form>
  );
};

export default PatientForm;
