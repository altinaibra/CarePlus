import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createPatient } from "./patientsSlice";

const PatientForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    age: "",
    email: "",
    gender: "",
    contact: "",
    address: "",
    password: "",
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact,
        address: formData.address,
        password: formData.password,
      }),
    );
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      age: "",
      email: "",
      gender: "",
      contact: "",
      address: "",
      password: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-5 mb-5 rounded-lg bg-white dark:[background-color:oklch(20.5%_0_0)] shadow-sm text-gray-900 dark:text-gray-100"
    >
      <h3 className="text-lg font-bold mb-4">{t("patients.addNew")}</h3>

      <input
        type="text"
        name="firstName"
        placeholder={t("patients.firstName")}
        value={formData.firstName}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="text"
        name="lastName"
        placeholder={t("patients.lastName")}
        value={formData.lastName}
        onChange={handleChange}
        required
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="date"
        name="dateOfBirth"
        placeholder={t("patients.dateOfBirth")}
        value={formData.dateOfBirth}
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
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />
      <input
        type="email"
        name="email"
        placeholder={t("patients.email")}
        value={formData.email}
        onChange={handleChange}
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="text"
        name="gender"
        placeholder={t("patients.gender")}
        value={formData.gender}
        onChange={handleChange}
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="tel"
        name="contact"
        placeholder={t("patients.contact")}
        value={formData.contact}
        onChange={handleChange}
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="text"
        name="address"
        placeholder={t("patients.address")}
        value={formData.address}
        onChange={handleChange}
        className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <input
        type="password"
        name="password"
        placeholder={t("patients.password")}
        value={formData.password}
        onChange={handleChange}
        className="block mb-4 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
      />

      <button
        type="submit"
        className="px-5 py-2 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white rounded cursor-pointer hover:bg-slate-800 transition font-semibold"
      >
        {t("patients.addButton")}
      </button>
    </form>
  );
};

export default PatientForm;
