import React from "react";
import { useTranslation } from "react-i18next";
import AppointmentForm from "../features/appointments/AppointmentForm";
import AppointmentList from "../features/appointments/AppointmentList";

const AppointmentsPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "20px" }}>
      <h2>{t("appointments.title")}</h2>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
