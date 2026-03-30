import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { login as loginAction } from "./authSlice";
import { authAPI } from "../../app/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authAPI.login(formData);
      const { id, token, role, username } = response.data;
      const normalizedRole = role.toLowerCase();
      localStorage.setItem("userId", id.toString());
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", normalizedRole);
      localStorage.setItem("username", username);

      dispatch(
        loginAction({
          user: username,
          role: normalizedRole,
          token: token,
        }),
      );

      if (normalizedRole === "doctor") {
        navigate("/prescription");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message;
      setError(apiError || "Invalid credentials");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] bg-white dark:[background-color:oklch(20.5%_0_0)] p-8 w-full max-w-lg mx-auto mt-16 rounded-lg shadow-md text-gray-900 dark:text-gray-100"
    >
      <h2 className="text-2xl font-bold mb-6">{t("login.title")}</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
          {t("login.emailOrUsername")}:
        </label>
        <input
          type="text"
          name="username"
          placeholder={t("login.emailOrUsername")}
          value={formData.username}
          onChange={handleChange}
          required
          className="block px-3 py-2 w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      <div className="mb-6 relative">
        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-200">
          {t("login.password")}:
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder={t("login.password")}
          value={formData.password}
          onChange={handleChange}
          required
          className="block w-full px-3 py-2 pr-10 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />

        {/* Ikona brenda input-it, absolute */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/12 text-gray-500 dark:text-gray-400"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>

      <button
        type="submit"
        className="px-5 py-3 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white border-0 rounded-md cursor-pointer w-full text-base font-bold hover:bg-slate-800 transition"
      >
        {t("login.button")}
      </button>
    </form>
  );
};

export default LoginForm;
