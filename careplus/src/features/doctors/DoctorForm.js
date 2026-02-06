import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addDoctor } from "./doctorsSlice";

const DoctorForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    email: "",
    phone: "",
    licenseNumber: "",
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
    const newDoctor = {
      id: Date.now(),
      ...formData,
    };
    dispatch(addDoctor(newDoctor));
    setFormData({
      name: "",
      speciality: "",
      email: "",
      phone: "",
      licenseNumber: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h3>{t("doctors.addNew")}</h3>
      <input
        type="text"
        name="name"
        placeholder={t("doctors.name")}
        value={formData.name}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <input
        type="text"
        name="speciality"
        placeholder={t("doctors.speciality")}
        value={formData.speciality}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <input
        type="email"
        name="email"
        placeholder={t("doctors.email")}
        value={formData.email}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <input
        type="tel"
        name="phone"
        placeholder={t("doctors.phone")}
        value={formData.phone}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <input
        type="text"
        name="licenseNumber"
        placeholder={t("doctors.license")}
        value={formData.licenseNumber}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        {t("doctors.addButton")}
      </button>
    </form>
  );
};

export default DoctorForm;
