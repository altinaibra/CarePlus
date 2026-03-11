import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { createDoctor } from "./doctorsSlice";
import { AppDispatch } from "../../app/store";
import styles from "../../styles/DoctorFormStyles";

interface CreateDoctorForm {
  firstName: string;
  lastName: string;
  speciality: string; // frontend name
  email: string;
  phone: string;
  licenseNumber: string;
  password: string;
}

const DoctorForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<CreateDoctorForm>({
    firstName: "",
    lastName: "",
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

    if (!formData.speciality.trim() || !formData.licenseNumber.trim()) {
      alert("Specialization and License Number are required.");
      return;
    }

    dispatch(createDoctor(formData));

    setFormData({
      firstName: "",
      lastName: "",
      speciality: "",
      email: "",
      phone: "",
      licenseNumber: "",
      password: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full p-5 border rounded-lg bg-white dark:bg-[oklch(20.5%_0_0)] dark:border-[oklch(47.6%_0.114_61.907)] shadow-sm text-gray-900 dark:text-gray-100"
    >
      <h3 className={styles.header}>{t("doctors.addNew")}</h3>

      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            name="firstName"
            placeholder={t("doctors.firstName")}
            value={formData.firstName}
            onChange={handleChange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="lastName"
            placeholder={t("doctors.lastName")}
            value={formData.lastName}
            onChange={handleChange}
            required
            className={styles.inputLast}
          />
        </div>

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
      </div>

      <button
        type="submit"
        className="mt-auto px-5 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded cursor-pointer hover:bg-slate-800 transition font-semibold"
      >
        {t("doctors.addButton")}
      </button>
    </form>
  );
};

export default DoctorForm;
