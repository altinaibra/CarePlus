import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addAppointment } from "./appointmentsSlice";

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
    const newAppointment = {
      id: Date.now(),
      ...formData,
    };
    dispatch(addAppointment(newAppointment));
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
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h3>{t("appointments.addNew")}</h3>
      <input
        type="text"
        name="patientName"
        placeholder={t("appointments.patient")}
        value={formData.patientName}
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
        name="doctorName"
        placeholder={t("appointments.doctor")}
        value={formData.doctorName}
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
        type="date"
        name="date"
        value={formData.date}
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
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
        }}
      />
      <textarea
        name="reason"
        placeholder={t("appointments.reason")}
        value={formData.reason}
        onChange={handleChange}
        required
        style={{
          display: "block",
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          minHeight: "80px",
        }}
      />
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        {t("appointments.addButton")}
      </button>
    </form>
  );
};

export default AppointmentForm;
