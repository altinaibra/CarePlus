import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addPatient } from "./patientsSlice";

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
    const newPatient = {
      id: Date.now(),
      ...formData,
    };
    dispatch(addPatient(newPatient));
    setFormData({ name: "", email: "", phone: "", age: "", address: "" });
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
      <h3>{t("patients.addNew")}</h3>
      <input
        type="text"
        name="name"
        placeholder={t("patients.name")}
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
        type="email"
        name="email"
        placeholder={t("patients.email")}
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
        placeholder={t("patients.phone")}
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
        type="number"
        name="age"
        placeholder={t("patients.age")}
        value={formData.age}
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
        name="address"
        placeholder={t("patients.address")}
        value={formData.address}
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
        {t("patients.addButton")}
      </button>
    </form>
  );
};

export default PatientForm;
