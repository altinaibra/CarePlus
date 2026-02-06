import React from "react";
import { useTranslation } from "react-i18next";
import DoctorForm from "../features/doctors/DoctorForm";
import DoctorList from "../features/doctors/DoctorList";

const DoctorsPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("doctors.title")}</h2>
      <DoctorForm />
      <DoctorList />
    </div>
  );
};

export default DoctorsPage;
