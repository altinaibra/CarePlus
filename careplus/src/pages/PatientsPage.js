import React from "react";
import { useTranslation } from "react-i18next";
import PatientForm from "../features/patients/PatientForm";
import PatientList from "../features/patients/PatientList";

const PatientsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6">{t("patients.title")}</h2>
      <PatientForm />
      <PatientList />
    </div>
  );
};

export default PatientsPage;
