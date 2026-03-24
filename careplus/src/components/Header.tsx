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
} from "react-icons/fa";

import LanguageSelector from "../locales/LanguageSelector";
import ThemeToggle from "../context/ThemeToggle";
import { RootState } from "../app/store";
import HeaderStyles from "../styles/HeaderStyles";
import { laboratoryAPI } from "../app/laboratory";

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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [labEnabled, setLabEnabled] = useState(false);

  useEffect(() => {
    // Merr statusin e laboratorit për user-in kur mount-on
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
    setLabEnabled(newStatus); // update local state

    // Ruaj statusin në backend
    laboratoryAPI
      .toggleStatus({ userId: user, status: newStatus })
      .then((res) => {
        console.log("Lab status updated:", res.data.status);
      })
      .catch((err) => {
        console.error("Error updating lab status:", err);
        setLabEnabled(!newStatus); // rollback në rast gabimi
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
    {
      path: "/patients",
      label: t("sidebar.patients"),
      Icon: FaUsers,
    },
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

  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.logoContainer}>
        {React.createElement(
          FaUserMd as React.ComponentType<{ size?: number }>,
          { size: 32 },
        )}
        <h3 className="text-xl font-bold">{t("header.title")}</h3>
      </div>

      <nav className={HeaderStyles.nav}>
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
          <LanguageSelector i18n={i18n} changeLanguage={changeLanguage} />

          <ThemeToggle />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={HeaderStyles.userButton}
            >
              {React.createElement(
                FaUserMd as React.ComponentType<{ size?: number }>,
                { size: 22 },
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
                  {t("header.profile") || "Profile"}
                </Link>

                <Link
                  to="/settings"
                  className={HeaderStyles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("header.settings") || "Settings"}
                </Link>

                <Link
                  to="/appointments"
                  className={HeaderStyles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  {t("header.appointments") || "Appointments"}
                </Link>

                {role === "doctor" && (
                  <Link
                    to="/prescription"
                    className={HeaderStyles.dropdownItem}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {t("header.prescription") || "Prescription"}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className={HeaderStyles.dropdownButton}
                >
                  {t("header.logout") || "Logout"}
                </button>
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
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
