import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login } from "./authSlice";

const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    role: "",
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
    if (formData.name && formData.role) {
      dispatch(
        login({
          user: formData.name,
          role: formData.role,
        }),
      );
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #ccc",
        padding: "30px",
        maxWidth: "400px",
        margin: "50px auto",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{t("login.title")}</h2>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          {t("login.name")}:
        </label>
        <input
          type="text"
          name="name"
          placeholder={t("login.namePlaceholder")}
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            display: "block",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          {t("login.role")}:
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          style={{
            display: "block",
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #ddd",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <option value="">{t("login.selectRole")}</option>
          <option value="doctor">{t("login.doctor")}</option>
          <option value="nurse">{t("login.nurse")}</option>
          <option value="admin">{t("login.admin")}</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          padding: "12px 20px",
          backgroundColor: "#2c3e50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {t("login.button")}
      </button>
    </form>
  );
};

export default LoginForm;
