import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createPatient } from "./patientsSlice";
import { AppDispatch } from "../../app/store";

export interface PatientFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  email: string;
  gender: string;
  contact: string;
  address: string;
  password: string;
}

const PatientForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<PatientFormData>({
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

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPatient(formData));
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

      {[
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "dateOfBirth", type: "date" },
        { name: "age", type: "number" },
        { name: "email", type: "email" },
        { name: "gender", type: "text" },
        { name: "contact", type: "tel" },
        { name: "address", type: "text" },
        { name: "password", type: "password" },
      ].map(({ name, type }) => (
        <input
          key={name}
          type={type}
          name={name}
          placeholder={t(`patients.${name}`)}
          value={formData[name as keyof PatientFormData]}
          onChange={handleChange}
          required={
            name !== "age" &&
            name !== "gender" &&
            name !== "contact" &&
            name !== "address"
          }
          className="block mb-3 p-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      ))}

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
