import React from "react";
import DoctorForm from "../features/doctors/DoctorForm";
import DoctorList from "../features/doctors/DoctorList";

const DoctorsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Menaxhimi i Doktorëve</h2>
      <DoctorForm />
      <DoctorList />
    </div>
  );
};

export default DoctorsPage;
