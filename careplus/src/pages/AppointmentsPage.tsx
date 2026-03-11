import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AppointmentForm from "../features/appointments/AppointmentForm";
import AppointmentList from "../features/appointments/AppointmentList";

const AppointmentsPage = () => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<"createAppointment" | null>(
    null,
  );

  const handleOpen = () => setActiveModal("createAppointment");
  const handleClose = () => setActiveModal(null);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t("appointments.list")}
        </h2>
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded"
        >
          {t("appointments.addAppointment")}
        </button>
      </div>

      <AppointmentList />

      {activeModal && (
        <div className="fixed inset-0 flex z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleClose}
          />

          <div
            className={`ml-auto w-[600px] h-full bg-white dark:[background-color:oklch(20.5%_0_0)] shadow-xl transform transition-transform duration-300 ${
              activeModal ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 h-full overflow-y-auto">
              {activeModal === "createAppointment" && <AppointmentForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
