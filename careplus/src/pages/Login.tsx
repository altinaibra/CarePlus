import React from "react";
import LoginForm from "../features/auth/LoginForm";
import ThemeToggle from "../context/ThemeToggle";
import LanguageSelector from "../locales/LanguageSelector";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:[background-color:oklch(20.5%_0_0)] relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSelector i18n={i18n} changeLanguage={changeLanguage} />
        <ThemeToggle />
      </div>

      <LoginForm />
    </div>
  );
};

export default Login;
