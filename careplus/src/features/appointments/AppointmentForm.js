import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "./appointmentsSlice";

const AppointmentForm = () => {
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
      <h3>Shto Takimin e Ri</h3>
      <input
        type="text"
        name="patientName"
        placeholder="Emri i Pacientit"
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
        placeholder="Emri i Doktorit"
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
        placeholder="Arsyeja e Vizitës"
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
        Shto Takimin
      </button>
    </form>
  );
};

export default AppointmentForm;
