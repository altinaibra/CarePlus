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
import Profile from "./pages/Profile";
import DepartmentDetails from "./pages/DepartmentDetails/DepartmentDetails";
import { SettingsProvider } from "./components/Settings/Settings";
import SettingsPage from "./pages/SettingsPage";

interface RootState {
  auth: {
    isLoggedIn: boolean;
  };
}

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <SettingsProvider>
      <Router>
        {isLoggedIn ? (
          <>
            <Header />
            <div className="flex">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/patients" element={<PatientsPage />} />
                  <Route path="/doctors" element={<DoctorsPage />} />
                  <Route path="/appointments" element={<AppointmentsPage />} />
                  <Route path="/login" element={<Navigate to="/" />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route
                    path="/departments/:id"
                    element={<DepartmentDetails />}
                  />
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
    </SettingsProvider>
  );
};

export default App;
