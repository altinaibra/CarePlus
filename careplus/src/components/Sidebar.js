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
    <aside
      style={{
        width: "200px",
        backgroundColor: "#34495e",
        color: "white",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {menuItems.map((item, index) => (
            <li key={index} style={{ marginBottom: "15px" }}>
              <Link
                to={item.path}
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px", 
                }}
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
