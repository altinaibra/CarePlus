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
    <header
      style={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <MdLocalHospital size={32} />
        <h3>{t("header.title")}</h3>
      </div>
      {user && (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>
            <strong>{user}</strong> ({getRoleLabel(role)})
          </span>
          <select
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#ecf0f1",
            }}
          >
            <option value="al">Albanian</option>
            <option value="en">English</option>
          </select>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              backgroundColor: "#f5f5f5",
              color: "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {t("header.logout")}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
