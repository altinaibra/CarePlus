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
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.header}>{t("patients.addNew")}</h3>

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
          className={`${styles.input} ${type === "date" ? styles.dateInput : ""}`}
        />
      ))}

      <button type="submit" className={styles.submitButton}>
        {t("patients.addButton")}
      </button>
    </form>
  );
};

export default PatientForm;
