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
import PrescriptionPage from "./pages/PrescriptionPage";
import { RootState } from "./app/store";
import { SnackbarProvider } from "./ui/SnackbarContext";

const App: React.FC = () => {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

  return (
    <SnackbarProvider>
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
                    <Route
                      path="/appointments"
                      element={<AppointmentsPage />}
                    />
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route
                      path="/prescription"
                      element={
                        role === "doctor" ? (
                          <PrescriptionPage />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
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
    </SnackbarProvider>
  );
};

export default App;
