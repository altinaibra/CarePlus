import React from "react";
import { useTranslation } from "react-i18next";
import PatientForm from "../features/patients/PatientForm";
import PatientList from "../features/patients/PatientList";

const PatientsPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("patients.title")}</h2>
      <PatientForm />
      <PatientList />
    </div>
  );
};

export default PatientsPage;
