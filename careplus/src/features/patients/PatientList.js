import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deletePatient } from "./patientsSlice";

const PatientList = () => {
  const { t } = useTranslation();
  const patients = useSelector((state) => state.patients.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{t("patients.list")}</h3>
      {patients.length === 0 ? (
        <p>{t("patients.noPatients")}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("patients.name")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("patients.email")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("patients.phone")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("patients.age")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("patients.address")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("patients.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.age}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {patient.address}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => dispatch(deletePatient(patient.id))}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t("patients.delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;
