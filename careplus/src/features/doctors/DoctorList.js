import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteDoctor } from "./doctorsSlice";

const DoctorList = () => {
  const { t } = useTranslation();
  const doctors = useSelector((state) => state.doctors.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{t("doctors.list")}</h3>
      {doctors.length === 0 ? (
        <p>{t("doctors.noDoctors")}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("doctors.name")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("doctors.speciality")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("doctors.email")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("doctors.phone")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("doctors.license")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("doctors.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.speciality}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {doctor.licenseNumber}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => dispatch(deleteDoctor(doctor.id))}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t("doctors.delete")}
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

export default DoctorList;
