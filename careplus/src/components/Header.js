import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../features/auth/authSlice";
import { MdLocalHospital } from "react-icons/md";

const Header = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    const roles = {
      doctor: t("login.doctor"),
      nurse: t("login.nurse"),
      admin: t("login.admin"),
    };
    return roles[role] || role;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <header className="bg-slate-700 text-white px-5 py-5 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MdLocalHospital size={32} />
        <h3 className="text-xl font-bold">{t("header.title")}</h3>
      </div>
      {user && (
        <div className="flex gap-5 items-center">
          <span className="text-sm">
            <strong>{user}</strong> ({getRoleLabel(role)})
          </span>
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-3 py-1.5 rounded-md border-0 cursor-pointer bg-gray-200 text-gray-900 text-sm"
          >
            <option value="al">Albanian</option>
            <option value="en">English</option>
          </select>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-100 text-gray-900 border-0 rounded-md cursor-pointer hover:bg-gray-200 transition"
          >
            {t("header.logout")}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
