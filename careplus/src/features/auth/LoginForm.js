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
      className="border border-gray-300 p-8 max-w-md mx-auto mt-16 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">{t("login.title")}</h2>

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700">
          {t("login.name")}:
        </label>
        <input
          type="text"
          name="name"
          placeholder={t("login.namePlaceholder")}
          value={formData.name}
          onChange={handleChange}
          required
          className="block px-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-bold text-gray-700">
          {t("login.role")}:
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="block px-3 py-2 w-full border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-700"
        >
          <option value="">{t("login.selectRole")}</option>
          <option value="doctor">{t("login.doctor")}</option>
          <option value="nurse">{t("login.nurse")}</option>
          <option value="admin">{t("login.admin")}</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-5 py-3 bg-slate-700 text-white border-0 rounded-md cursor-pointer w-full text-base font-bold hover:bg-slate-800 transition"
      >
        {t("login.button")}
      </button>
    </form>
  );
};

export default LoginForm;
