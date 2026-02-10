import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MdHome, MdPeople, MdLocalHospital, MdEventNote } from "react-icons/md";

const Sidebar = () => {
  const { t } = useTranslation();

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

  return (
    <aside className="w-56 bg-slate-600 text-white px-5 py-5 min-h-screen">
      <nav>
        <ul className="list-none p-0">
          {menuItems.map((item, index) => (
            <li key={index} className="mb-4">
              <Link
                to={item.path}
                className="text-white no-underline flex items-center gap-2 hover:text-gray-200 transition"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
