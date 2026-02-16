import React from "react";
import { useTranslation } from "react-i18next";
import DoctorForm from "../features/doctors/DoctorForm";
import DoctorList from "../features/doctors/DoctorList";

const DoctorsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6">{t("doctors.title")}</h2>
      <DoctorForm />
      <DoctorList />
    </div>
  );
};

export default DoctorsPage;
