import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createPatient } from "./patientsSlice";
import { AppDispatch } from "../../app/store";
import styles from "../../styles/PatientFormStyles";

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      className="flex flex-col justify-between h-full p-5 border rounded-lg bg-white dark:bg-[oklch(20.5%_0_0)] dark:border-[oklch(47.6%_0.114_61.907)] shadow-sm text-gray-900 dark:text-gray-100"
    >
      <h3 className={styles.header}>{t("patients.addNew")}</h3>

      {[
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
        { name: "dateOfBirth", type: "date" },
        { name: "age", type: "number" },
        { name: "email", type: "email" },
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
          required={name !== "age" && name !== "contact" && name !== "address"}
          className={`${styles.input} ${type === "date" ? styles.dateInput : ""}`}
        />
      ))}

      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="gender"
            value="F"
            checked={formData.gender === "F"}
            onChange={handleChange}
            className="accent-slate-700 dark:accent-[oklch(47.6%_0.114_61.907)]"
            required
          />
          {t("patients.female") || "F"}
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="gender"
            value="M"
            checked={formData.gender === "M"}
            onChange={handleChange}
            className="accent-slate-700 dark:accent-[oklch(47.6%_0.114_61.907)]"
            required
          />
          {t("patients.male") || "M"}
        </label>
      </div>

      <button
        type="submit"
        className="mt-auto px-5 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded cursor-pointer hover:bg-slate-800 transition font-semibold"
      >
        {t("patients.addButton")}
      </button>
    </form>
  );
};

export default PatientForm;
