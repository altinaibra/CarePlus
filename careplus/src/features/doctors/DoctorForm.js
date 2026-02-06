import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDoctor } from "./doctorsSlice";

const DoctorForm = () => {
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
      <h3>Shto Doktorin e Ri</h3>
      <input
        type="text"
        name="name"
        placeholder="Emri"
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
        placeholder="Specialiteti"
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
        placeholder="Email"
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
        placeholder="Telefon"
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
        placeholder="Numri i Licencës"
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
        Shto Doktorin
      </button>
    </form>
  );
};

export default DoctorForm;
