import React from "react";
import PatientForm from "../features/patients/PatientForm";
import PatientList from "../features/patients/PatientList";

const PatientsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Menaxhimi i Pacientëve</h2>
      <PatientForm />
      <PatientList />
    </div>
  );
};

export default PatientsPage;
