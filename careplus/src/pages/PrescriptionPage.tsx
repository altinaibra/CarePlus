import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const PrescriptionPage: React.FC = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergies, setAllergies] = useState("");
  const { t } = useTranslation();

  const handleSave = () => alert("Prescription saved!");
  const handleClose = () => alert("Closing page...");
  const handlePrint = () => window.print();

  return (
    <div className="w-[50%] mx-auto bg-gray-100 dark:[background-color:oklch(20.5%_0_0)] min-h-screen py-5 px-8 sm:px-10 rounded-[10px] shadow-md dark:shadow-none">
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white rounded hover:bg-gray-800 dark:hover:bg-gray-700 transition"
        >
          {t("settings.print")}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        {t("settings.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            {t("settings.patientName")}
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)] bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition"
            placeholder={t("settings.patientNamePlaceholder")}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            {t("settings.patientAge")}
          </label>
          <input
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)] bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition"
            placeholder={t("settings.patientAgePlaceholder")}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
            {t("settings.patientGender")}
          </label>
          <input
            type="text"
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)] bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition"
            placeholder={t("settings.patientGenderPlaceholder")}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={hasAllergies}
            onChange={(e) => setHasAllergies(e.target.checked)}
            className="mr-2"
          />
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {t("settings.hasAllergies")}
          </span>
        </label>

        {hasAllergies && (
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded mt-2 bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)]"
            placeholder={t("settings.allergiesPlaceholder")}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          {t("settings.diagnosis")}
        </label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded min-h-[80px] bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)]"
          placeholder={t("settings.diagnosisPlaceholder")}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
          {t("settings.prescription")}
        </label>
        <textarea
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded min-h-[120px] bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)]"
          placeholder={t("settings.prescriptionPlaceholder")}
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded hover:bg-gray-500 dark:hover:bg-gray-700 transition"
        >
          {t("settings.close")}
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)]  text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          {t("settings.save")}
        </button>
      </div>
    </div>
  );
};

export default PrescriptionPage;
