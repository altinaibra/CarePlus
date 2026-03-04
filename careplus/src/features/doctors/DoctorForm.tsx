import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createDoctor } from "./doctorsSlice";
import { AppDispatch } from "../../app/store";
import styles from "../../styles/DoctorFormStyles";

interface CreateDoctorDto {
  name: string;
  speciality: string;
  email: string;
  phone: string;
  licenseNumber: string;
  password: string;
}

const DoctorForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<CreateDoctorDto>({
    name: "",
    speciality: "",
    email: "",
    phone: "",
    licenseNumber: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createDoctor(formData));

    setFormData({
      name: "",
      speciality: "",
      email: "",
      phone: "",
      licenseNumber: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3 className={styles.header}>{t("doctors.addNew")}</h3>

      <input
        type="text"
        name="name"
        placeholder={t("doctors.name")}
        value={formData.name}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="text"
        name="speciality"
        placeholder={t("doctors.speciality")}
        value={formData.speciality}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="email"
        name="email"
        placeholder={t("doctors.email")}
        value={formData.email}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="tel"
        name="phone"
        placeholder={t("doctors.phone")}
        value={formData.phone}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder={t("doctors.password")}
        value={formData.password}
        onChange={handleChange}
        required
        className={styles.input}
      />

      <input
        type="text"
        name="licenseNumber"
        placeholder={t("doctors.license")}
        value={formData.licenseNumber}
        onChange={handleChange}
        required
        className={styles.inputLast}
      />

      <button type="submit" className={styles.submitButton}>
        {t("doctors.addButton")}
      </button>
    </form>
  );
};

export default DoctorForm;
