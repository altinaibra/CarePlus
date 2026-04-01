import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCog } from "react-icons/fa";
import Printers from "./Modals/Printers";
import ChangePassword from "./Modals/ChangePassword";
import DepartmentSettings from "./Modals/DepartmentSettings";
import RoomSettings from "./Modals/RoomSettings";
import PatientsChart from "../../features/patients/PatientsChart";
import CalendarSettings from "./Modals/CalendarSettings";
import ShiftSettings from "./Modals/ShiftSettings";
import PatientCategoriesSettings from "./Modals/PatientCategoriesSettings";
import BillingSettings from "./Modals/BillingSettings";
import NotificationSettings from "./Modals/NotificationSettings";
import NotificationTemplateSettings from "./Modals/NotificationTemplateSettings";
import FinancialSettings from "./Modals/FinancialSettings";
import BackupSettings from "./Modals/BackupSettings";
import AuditSettings from "./Modals/AuditSettings";
import IntegrationsSettings from "./Modals/IntegrationsSettings";

import {
  FaPrint,
  FaKey,
  FaHospital,
  FaBed,
  FaChartBar,
  FaCalendarAlt,
  FaClock,
  FaFileInvoiceDollar,
  FaBell,
  FaEnvelope,
  FaMoneyBillWave,
  FaDatabase,
  FaHistory,
  FaPlug,
} from "react-icons/fa";

type SettingsModal =
  | "printers"
  | "changePassword"
  | "departments"
  | "rooms"
  | "patients"
  | "calendar"
  | "shiftSchedule"
  | "patientCategories"
  | "billing"
  | "notifications"
  | "notificationTemplates"
  | "finance"
  | "backup"
  | "audit"
  | "integrations";

const settingsOptions: {
  titleKey: string;
  descriptionKey: string;
  modal: SettingsModal;
  color: string;
  icon: React.ElementType;
}[] = [
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
    titleKey: "settingsPage.shiftSchedule",
    descriptionKey: "settingsPage.shiftScheduleDescription",
    modal: "shiftSchedule",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaClock,
  },
  {
    titleKey: "settingsPage.patientCategories",
    descriptionKey: "settingsPage.patientCategoriesDescription",
    modal: "patientCategories",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaBed,
  },
  {
    titleKey: "settingsPage.billing",
    descriptionKey: "settingsPage.billingDescription",
    modal: "billing",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaFileInvoiceDollar,
  },
  {
    titleKey: "settingsPage.notifications",
    descriptionKey: "settingsPage.notificationsDescription",
    modal: "notifications",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaBell,
  },
  {
    titleKey: "settingsPage.notificationTemplates",
    descriptionKey: "settingsPage.notificationTemplatesDescription",
    modal: "notificationTemplates",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaEnvelope,
  },
  {
    titleKey: "settingsPage.finance",
    descriptionKey: "settingsPage.financeDescription",
    modal: "finance",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaMoneyBillWave,
  },
  {
    titleKey: "settingsPage.backupRestore",
    descriptionKey: "settingsPage.backupRestoreDescription",
    modal: "backup",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaDatabase,
  },
  {
    titleKey: "settingsPage.auditLog",
    descriptionKey: "settingsPage.auditLogDescription",
    modal: "audit",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaHistory,
  },
  {
    titleKey: "settingsPage.integrations",
    descriptionKey: "settingsPage.integrationsDescription",
    modal: "integrations",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
    icon: FaPlug,
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

  const [activeModal, setActiveModal] = useState<SettingsModal | null>(null);

  const handleOpenModal = (modal: SettingsModal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h2 className="flex items-center text-2xl font-bold mb-6 gap-2">
        <FaCog
          className="text-gray-700 dark:text-[oklch(47.6%_0.114_61.907)]"
          size={24}
        />
        {t("settings.Settings")}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {settingsOptions.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.titleKey}
              onClick={() => handleOpenModal(option.modal)}
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
              {activeModal === "shiftSchedule" && <ShiftSettings />}
              {activeModal === "patientCategories" && (
                <PatientCategoriesSettings />
              )}
              {activeModal === "billing" && <BillingSettings />}
              {activeModal === "notifications" && <NotificationSettings />}
              {activeModal === "notificationTemplates" && (
                <NotificationTemplateSettings />
              )}
              {activeModal === "finance" && <FinancialSettings />}
              {activeModal === "backup" && <BackupSettings />}
              {activeModal === "audit" && <AuditSettings />}
              {activeModal === "integrations" && <IntegrationsSettings />}
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
