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
    <div className="min-h-screen bg-gray-100 dark:bg-[oklch(20.5%_0_0)] py-10">

      <div className="w-[50%] mx-auto flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="px-8 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded hover:bg-gray-800 dark:hover:bg-gray-700 transition"
        >
          {t("settings.print")}
        </button>
      </div>

      <div
        className="w-[50%] mx-auto bg-white dark:bg-[oklch(23%_0_0)] 
          rounded-[10px] shadow-md dark:shadow-none p-8
          min-h-[80vh]"
      >
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
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              {t("settings.patientGender")}
            </label>
            <div className="flex gap-4">
              {["F", "M"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => setPatientGender(gender)}
                  className="flex items-center gap-2 py-2 px-3 rounded transition font-semibold focus:outline-none"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                    ${
                      patientGender === gender
                        ? "border-gray-400 dark:border-[oklch(47.6%_0.114_61.907)]"
                        : "border-gray-400 dark:border-[oklch(47.6%_0.114_61.907)]"
                    }`}
                  >
                    {patientGender === gender && (
                      <span className="w-2 h-2 rounded-full bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]" />
                    )}
                  </span>
                  <span
                    className={`font-medium ${
                      patientGender === gender
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {gender === "F" ? "Female" : "Male"}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasAllergies}
              onChange={(e) => setHasAllergies(e.target.checked)}
              className="w-4 h-4 rounded border-gray-400 dark:border-[oklch(47.6%_0.114_61.907)]
               bg-white dark:bg-[oklch(20.5%_0_0)]
               checked:bg-[#EF4136] dark:checked:bg-[oklch(47.6%_0.114_61.907)]
               focus:ring-2 focus:ring-[#EF4136] dark:focus:ring-[oklch(47.6%_0.114_61.907)]
               transition"
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
              className="w-full p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded mt-2
                 bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition
                 hover:border-gray-400 dark:hover:border-[oklch(50%_0.1_60%)]"
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

        <div className="mb-4 flex justify-end mt-60">
          <div className="w-1/5">
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300 text-right">
              {t("settings.doctorSignature")}
            </label>
            <input
              type="text"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              className="w-full p-2 border-b border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] 
              bg-transparent text-gray-900 dark:text-gray-100 
              focus:outline-none focus:border-slate-700 dark:focus:border-[oklch(47.6%_0.114_61.907)] 
              placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
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
            className="px-4 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            {t("settings.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;
