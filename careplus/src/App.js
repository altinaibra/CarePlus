import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Header />
          <div className="flex">
            {/* <Sidebar /> */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/login" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
