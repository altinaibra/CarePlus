import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "../features/auth/authSlice";
import { IconType } from "react-icons";

import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaPrescriptionBottleAlt,
  FaFlask,
  FaSignOutAlt,
  FaPrescriptionBottle,
  FaCog,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import LanguageSelector from "../locales/LanguageSelector";
import ThemeToggle from "../context/ThemeToggle";
import { RootState } from "../app/store";
import HeaderStyles from "../styles/HeaderStyles";
import { laboratoryAPI } from "../app/laboratoryApi";

interface MenuItem {
  path: string;
  label: string;
  Icon: IconType;
}

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labEnabled, setLabEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      laboratoryAPI
        .getByUser(user)
        .then((res) => setLabEnabled(res.data.status))
        .catch((err) => console.error("Error fetching lab status:", err));
    }
  }, [user]);

  const handleLabToggle = () => {
    if (!user) return;
    const newStatus = !labEnabled;
    setLabEnabled(newStatus);

    laboratoryAPI
      .toggleStatus({ userId: user, status: newStatus })
      .then((res) => {
        console.log("Lab status updated:", res.data.status);
      })
      .catch((err) => {
        setLabEnabled(!newStatus);
      });
  };
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

  const menuItems: MenuItem[] = [
    { path: "/", label: t("sidebar.home"), Icon: FaHome },
    ...(role !== "patient"
      ? [
          {
            path: "/patients",
            label: t("sidebar.patients"),
            Icon: FaUsers,
          },
        ]
      : []),
    ...(role !== "doctor"
      ? [
          {
            path: "/doctors",
            label: t("sidebar.doctors"),
            Icon: FaUserMd,
          },
        ]
      : []),
    {
      path: "/appointments",
      label: t("sidebar.appointments"),
      Icon: FaCalendarAlt,
    },
    ...(role === "doctor"
      ? [
          {
            path: "/prescription",
            label: t("header.prescription") || "Prescription",
            Icon: FaPrescriptionBottleAlt,
          },
        ]
      : []),
    ...(labEnabled
      ? [
          {
            path: "/laboratory",
            label: t("header.laboratory") || "Laboratory",
            Icon: FaFlask,
          },
        ]
      : []),
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

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen]);

  return (
    <>
      <header className={HeaderStyles.header}>
        <div
          className={HeaderStyles.logoContainer}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          {React.createElement(
            FaUserMd as React.ComponentType<{ size?: number }>,
            { size: 30 },
          )}
          <h3 className="text-lg md:text-xl font-bold">{t("header.title")}</h3>
        </div>
        <nav className={`${HeaderStyles.nav} hidden md:flex`}>
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} className={HeaderStyles.navLink}>
              {React.createElement(
                item.Icon as React.ComponentType<{ size?: number }>,
                { size: 20 },
              )}

              <span className={HeaderStyles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {user && (
          <div className={HeaderStyles.rightSection}>
            <div className="hidden md:flex items-center gap-4">
              <LanguageSelector i18n={i18n} changeLanguage={changeLanguage} />
              <ThemeToggle />

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={HeaderStyles.userButton}
                >
                  {React.createElement(
                    role === "doctor" || role === "admin" ? FaUserMd : FaUser,
                    { size: 22, className: "inline mr-2" },
                  )}
                  <span className="text-sm">
                    <strong>{user ?? ""}</strong> ({getRoleLabel(role ?? "")})
                  </span>
                </button>

                {dropdownOpen && (
                  <div className={HeaderStyles.dropdown}>
                    <Link
                      to="/profile"
                      className={HeaderStyles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUser className="inline mr-2" />
                      {t("header.profile") || "Profile"}
                    </Link>

                    <Link
                      to="/settings"
                      className={HeaderStyles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaCog className="inline mr-2" />
                      {t("header.settings") || "Settings"}
                    </Link>

                    <Link
                      to="/appointments"
                      className={HeaderStyles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaCalendarAlt className="inline mr-2" />
                      {t("header.appointments") || "Appointments"}
                    </Link>

                    {role === "doctor" && (
                      <Link
                        to="/prescription"
                        className={HeaderStyles.dropdownItem}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <FaPrescriptionBottle className="inline mr-2" />
                        {t("header.prescription") || "Prescription"}
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className={HeaderStyles.dropdownButton}
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      {t("header.logout") || "Logout"}
                    </button>
                    {role !== "patient" && (
                      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-800 dark:text-gray-200">
                        <span>{t("header.laboratory")}</span>

                        <button
                          onClick={handleLabToggle}
                          className={`
                          relative inline-flex h-5 w-10 items-center rounded-full transition
                          ${labEnabled ? "bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] hover:bg-slate-800" : "bg-gray-300 dark:bg-gray-600"}
                        `}
                        >
                          <span
                            className={`
                          inline-block h-4 w-4 transform rounded-full bg-white transition
                          ${labEnabled ? "translate-x-5" : "translate-x-1"}
                        `}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-gray-500 dark:[background-color:oklch(47.6%_0.114_61.907)] transition"
              aria-label="Open mobile menu"
            >
              <FaBars size={18} />
            </button>
          </div>
        )}
      </header>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden">
          <button
            type="button"
            aria-label="Close mobile menu overlay"
            className="absolute inset-0 bg-black/45"
            onClick={() => setMobileSidebarOpen(false)}
          />

          <aside className="absolute top-0 left-0 h-full w-[82%] max-w-[320px] bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 shadow-2xl border-r border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]">
              <h4 className="font-semibold">{t("header.title")}</h4>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-gray-500 dark:[background-color:oklch(47.6%_0.114_61.907)]"
                aria-label="Close mobile menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="px-4 py-4 flex items-center gap-3 border-b border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]">
              <LanguageSelector i18n={i18n} changeLanguage={changeLanguage} />
              <ThemeToggle />
            </div>

            <nav className="p-3 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  {React.createElement(
                    item.Icon as React.ComponentType<{ size?: number }>,
                    { size: 18 },
                  )}
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}

              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <FaUser size={18} />
                <span className="text-sm">
                  {t("header.profile") || "Profile"}
                </span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <FaCog size={18} />
                <span className="text-sm">
                  {t("header.settings") || "Settings"}
                </span>
              </Link>
            </nav>

            {role !== "patient" && (
              <div className="px-4 py-3 border-t border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)] flex items-center justify-between text-sm">
                <span>{t("header.laboratory")}</span>
                <button
                  onClick={handleLabToggle}
                  className={`
                    relative inline-flex h-5 w-10 items-center rounded-full transition
                    ${labEnabled ? "bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] hover:bg-slate-800" : "bg-gray-300 dark:bg-gray-600"}
                  `}
                >
                  <span
                    className={`
                      inline-block h-4 w-4 transform rounded-full bg-white transition
                      ${labEnabled ? "translate-x-5" : "translate-x-1"}
                    `}
                  />
                </button>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]">
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-3 rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-gray-100"
              >
                <FaSignOutAlt className="inline mr-2" />
                {t("header.logout") || "Logout"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Header;
