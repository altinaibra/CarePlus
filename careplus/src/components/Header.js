import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { MdLocalHospital } from "react-icons/md";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getRoleLabel = (role) => {
    const roles = {
      doctor: "Doktor",
      nurse: "Infermier",
      admin: "Administrator",
    };
    return roles[role] || role;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
        <MdLocalHospital size={32} /> {/* ← Icon added here */}
        <h2>CarePlus - Sistemi i Menaxhimit të Spitalit</h2>
      </div>
      {user && (
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>
            <strong>{user}</strong> ({getRoleLabel(role)})
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Dilni
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
