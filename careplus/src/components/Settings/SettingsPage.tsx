import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../app/api";
import { useSnackbar } from "../../ui/SnackbarContext";
import { FaCog } from "react-icons/fa";
import Printers from "./Modals/Printers";
import ChangePassword from "./Modals/ChangePassword";
import DepartmentSettings from "./Modals/DepartmentSettings";
import RoomSettings from "./Modals/RoomSettings";
import PatientsChart from "../../features/patients/PatientsChart";
import CalendarSettings from "./Modals/CalendarSettings";

import {
  FaPrint,
  FaKey,
  FaHospital,
  FaBed,
  FaChartBar,
  FaCalendarAlt,
} from "react-icons/fa";

const settingsOptions = [
  {
    titleKey: "settingsPage.printers",
    descriptionKey: "settingsPage.description",
    modal: "printers",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaPrint,
  },
  {
    titleKey: "settingsPage.changePassword",
    descriptionKey: "settingsPage.passwordDescription",
    modal: "changePassword",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaKey,
  },
  {
    titleKey: "settingsPage.departments",
    descriptionKey: "settingsPage.departmentDescription",
    modal: "departments",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaHospital,
  },
  {
    titleKey: "settingsPage.rooms",
    descriptionKey: "settingsPage.roomDescription",
    modal: "rooms",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaBed,
  },
  {
    titleKey: "settingsPage.patientsStatistics",
    descriptionKey: "settingsPage.patientsStatistics",
    modal: "patients",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaChartBar,
  },
  {
    titleKey: "settingsPage.calendar",
    descriptionKey: "settingsPage.calendarDescription",
    modal: "calendar",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaCalendarAlt,
  },
];

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [activeModal, setActiveModal] = useState<
    | "printers"
    | "changePassword"
    | "departments"
    | "rooms"
    | "patients"
    | "calendar"
    | null
  >(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = (modal: "printers" | "changePassword") => {
    setActiveModal(modal);

    if (modal === "changePassword") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  };

  const handleCloseModal = () => setActiveModal(null);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showSnackbar(t("settingsPage.passwordsDontMatch"), "error");
      return;
    }

    try {
      const username = localStorage.getItem("username") || "";

      await authAPI.changePassword({
        username,
        currentPassword,
        newPassword,
      });

      showSnackbar(t("settingsPage.passwordChangedSuccessfully"), "success");
      handleCloseModal();
    } catch (err) {
      showSnackbar(t("settingsPage.failedToChangePassword"), "error");
    }
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="flex items-center text-2xl font-bold mb-6 gap-2">
        <FaCog
          className="text-gray-700 dark:text-[oklch(47.6%_0.114_61.907)]"
          size={24}
        />
        {t("settings.Settings")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsOptions.map((option) => {
          const Icon = option.icon; 
          return (
            <button
              key={option.titleKey}
              onClick={() =>
                handleOpenModal(option.modal as "printers" | "changePassword")
              }
              className="block text-left p-5 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg shadow hover:shadow-lg transition"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white mb-3 ${option.color}`}
              >
                <Icon className="text-xl" /> 
              </div>
              <h3 className="text-lg font-semibold mb-1">
                {t(option.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(option.descriptionKey)}
              </p>
            </button>
          );
        })}
      </div>

      {activeModal && (
        <div className="fixed inset-0 flex z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          />

          <div
            className={`ml-auto w-[600px] h-full bg-white dark:[background-color:oklch(20.5%_0_0)] shadow-xl transform transition-transform duration-300 ${
              activeModal ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 h-full overflow-y-auto">
              {activeModal === "changePassword" && (
                <ChangePassword onClose={handleCloseModal} />
              )}
              {activeModal === "printers" && <Printers />}
              {activeModal === "departments" && <DepartmentSettings />}
              {activeModal === "rooms" && <RoomSettings />}

              {activeModal === "patients" && <PatientsChart />}
              {activeModal === "calendar" && <CalendarSettings />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
