import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DoctorList from "../features/doctors/DoctorList";
import DoctorForm from "../features/doctors/DoctorForm";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const DoctorsPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"createDoctor" | null>(null);
  const handleOpen = () => setActiveModal("createDoctor");
  const handleClose = () => setActiveModal(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t("doctors.list")}
        </h2>
          {role !== "patient" && (
        <button
          onClick={handleOpen}
          className="px-4 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded"
        >
          {t("doctors.addDoctor")}
        </button>
          )}
      </div>

      <DoctorList />

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
              {activeModal === "createDoctor" && <DoctorForm />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
