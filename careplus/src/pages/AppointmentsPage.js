import React from "react";
import AppointmentForm from "../features/appointments/AppointmentForm";
import AppointmentList from "../features/appointments/AppointmentList";

const AppointmentsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Menaxhimi i Takimeve</h2>
      <AppointmentForm />
      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
