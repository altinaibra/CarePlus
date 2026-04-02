import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PatientForm from "../features/patients/PatientForm";
import PatientList from "../features/patients/PatientList";
import { FaUsers } from "react-icons/fa";

const PatientsPage = () => {
  const { t } = useTranslation();

  const [activeModal, setActiveModal] = useState<"createPatient" | null>(null);

  const handleOpen = () => setActiveModal("createPatient");
  const handleClose = () => setActiveModal(null);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-2 text-2xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          <FaUsers className="text-primary dark:text-white" />
          {t("patients.list")}
        </h2>

        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded"
        >
          {t("patients.create")}
        </button>
      </div>

      <PatientList />

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
              {activeModal === "createPatient" && <PatientForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsPage;
