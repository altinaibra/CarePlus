import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../features/auth/authSlice";
import { IconType } from "react-icons";

// New icons you want to use
import { FaHome, FaUserMd, FaUsers, FaCalendarAlt } from "react-icons/fa";

import LanguageSelector from "../locales/LanguageSelector";
import ThemeToggle from "../context/ThemeToggle";
import { RootState } from "../app/store";

interface MenuItem {
  path: string;
  label: string;
  Icon: IconType; // Use IconType from react-icons
}

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getRoleLabel = (role: string): string => {
    const roles: Record<string, string> = {
      doctor: t("login.doctor"),
      nurse: t("login.nurse"),
      admin: t("login.admin"),
    };
    return roles[role] || role;
  };

  const handleLogout = (): void => {
    dispatch(logout());
    navigate("/login");
  };

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Updated menu items with new icons
  const menuItems: MenuItem[] = [
    { path: "/", label: t("sidebar.home"), Icon: FaHome },
    { path: "/patients", label: t("sidebar.patients"), Icon: FaUsers },
    { path: "/doctors", label: t("sidebar.doctors"), Icon: FaUserMd },
    {
      path: "/appointments",
      label: t("sidebar.appointments"),
      Icon: FaCalendarAlt,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-slate-700 dark:[background-color:oklch(20.5%_0_0)] text-white px-5 py-4 flex items-center justify-between relative border-b border-gray-300 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
      <div className="flex items-center gap-2 z-10">
        {/* <FaUserMd size={32} /> */}
        <h3 className="text-xl font-bold">{t("header.title")}</h3>
      </div>

      <nav className="flex-1 flex justify-center gap-6 text-2xl">
        {menuItems.map((item, index) => {
          const Icon = item.Icon;
          return (
            <Link
              key={index}
              to={item.path}
              className="flex items-center gap-1 text-white hover:text-gray-200 transition"
            >
              {/* <Icon /> */}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="flex items-center gap-4 z-10">
          <LanguageSelector i18n={i18n} changeLanguage={changeLanguage} />
          <ThemeToggle />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-full bg-gray-200 text-gray-900 hover:bg-gray-300 dark:[background-color:oklch(20.5%_0_0)] dark:text-gray-100 dark:hover:[background-color:oklch(20.5%_0_0)] transition"
            >
              {/* <FaUserMd size={24} /> */}
              <span className="text-sm">
                <strong>{user ?? ""}</strong> ({getRoleLabel(role ?? "")})
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 rounded-md shadow-lg py-2 z-20 flex flex-col border border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]">
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
