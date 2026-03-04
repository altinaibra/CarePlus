import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PharmacyIcon from "../SVG/PharmacyIcon";
import { useTheme } from "../context/ThemeContext";
import { prescriptionAPI } from "../app/api";
import styles from "..//styles/PrescriptionStyles";

const PrescriptionPage: React.FC = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergies, setAllergies] = useState("");

  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const handleSave = async () => {
    try {
      await prescriptionAPI.create({
        patientName,
        patientAge: Number(patientAge),
        patientGender,
        hasAllergies,
        allergies,
      });
      alert("Prescription saved successfully!");
      setPatientName("");
      setPatientAge("");
      setPatientGender("");
      setHasAllergies(false);
      setAllergies("");
      setDiagnosis("");
      setPrescription("");
    } catch (error) {
      console.error(error);
      alert("Error saving prescription");
    }
  };

  const handleClose = () => alert("Closing page...");
  const handlePrint = () => window.print();

  return (
    <div className={styles.container}>
      <div className="w-[50%] mx-auto flex justify-end mb-4">
        <button onClick={handlePrint} className={styles.buttonPrint}>
          {t("settings.print")}
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <PharmacyIcon
            size={30}
            customColor={isDarkMode ? "#fff" : "rgb(51 65 85)"}
          />
        </div>

        <div className={styles.gridContainer}>
          {/* Patient Name */}
          <div>
            <label className={styles.label}>{t("settings.patientName")}</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className={styles.input}
              placeholder={t("settings.patientNamePlaceholder")}
            />
          </div>

          {/* Patient Age */}
          <div>
            <label className={styles.label}>{t("settings.patientAge")}</label>
            <input
              type="number"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              className={styles.input}
              placeholder={t("settings.patientAgePlaceholder")}
            />
          </div>

          {/* Gender */}
          <div>
            <label className={styles.label}>
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
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
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

        {/* Allergies */}
        <div className="mb-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasAllergies}
              onChange={(e) => setHasAllergies(e.target.checked)}
              className={styles.checkbox}
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
              className={styles.input + " mt-2"}
              placeholder={t("settings.allergiesPlaceholder")}
            />
          )}
        </div>

        {/* Diagnosis */}
        <div className="mb-4">
          <label className={styles.label}>{t("settings.diagnosis")}</label>
          <textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className={styles.textarea + " min-h-[100px]"}
            placeholder={t("settings.diagnosisPlaceholder")}
          />
        </div>

        {/* Prescription */}
        <div className="mb-4">
          <label className={styles.label}>{t("settings.prescription")}</label>
          <textarea
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            className={styles.textarea + " min-h-[200px]"}
            placeholder={t("settings.prescriptionPlaceholder")}
          />
        </div>

        {/* Doctor Signature */}
        <div className="mb-4 flex justify-end mt-28">
          <div className="w-1/5">
            <label className={styles.label + " text-right"}>
              {t("settings.doctorSignature")}
            </label>
            <input
              type="text"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              className={styles.signatureInput}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={handleClose} className={styles.buttonSecondary}>
            {t("settings.close")}
          </button>
          <button onClick={handleSave} className={styles.buttonPrimary}>
            {t("settings.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;
