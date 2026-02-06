import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
          <li style={{ marginBottom: "15px" }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/patients"
              style={{ color: "white", textDecoration: "none" }}
            >
              Pacientët
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/doctors"
              style={{ color: "white", textDecoration: "none" }}
            >
              Doktorët
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/appointments"
              style={{ color: "white", textDecoration: "none" }}
            >
              Takimet
            </Link>
          </li>
          <li style={{ marginBottom: "15px" }}>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dilni
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
