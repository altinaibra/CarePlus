import React from "react";
import { useTranslation } from "react-i18next";
import AppointmentForm from "../features/appointments/AppointmentForm";
import AppointmentList from "../features/appointments/AppointmentList";

const AppointmentsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6">{t("appointments.title")}</h2>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
