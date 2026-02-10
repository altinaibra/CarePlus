import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../features/auth/authSlice";
import {
  MdLocalHospital,
  MdHome,
  MdPeople,
  MdEventNote,
  MdPerson,
} from "react-icons/md";
import LanguageSelector from "../locales/LanguageSelector";
import ThemeToggle from "../context/ThemeToggle";

const Header = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const menuItems = [
    { path: "/", label: t("sidebar.home"), icon: <MdHome /> },
    { path: "/patients", label: t("sidebar.patients"), icon: <MdPeople /> },
    {
      path: "/doctors",
      label: t("sidebar.doctors"),
      icon: <MdLocalHospital />,
    },
    {
      path: "/appointments",
      label: t("sidebar.appointments"),
      icon: <MdEventNote />,
    },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-slate-700 text-white px-5 py-4 flex items-center justify-between relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 z-10">
        <MdLocalHospital size={32} />
        <h3 className="text-xl font-bold">{t("header.title")}</h3>
      </div>

      {/* Center: Menu */}
      <nav className="flex-1 flex justify-center gap-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-1 text-white hover:text-gray-200 transition"
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Right: Language, Theme, Profile */}
      {user && (
        <div className="flex items-center gap-4 z-10">
          {/* Language selector */}
          <LanguageSelector i18n={i18n} changeLanguage={changeLanguage} />

          {/* Theme toggle independent */}
          <ThemeToggle />

          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-full bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
            >
              <MdPerson size={24} />
              <span className="text-sm">
                <strong>{user}</strong> ({getRoleLabel(role)})
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-lg py-2 z-20 flex flex-col">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("header.profile") || "Profile"}
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("header.settings") || "Settings"}
                </Link>
                <Link
                  to="/appointments"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("header.appointments") || "Appointments"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {t("header.logout") || "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
