import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { deleteAppointment } from "./appointmentsSlice";

const AppointmentList = () => {
  const { t } = useTranslation();
  const appointments = useSelector((state) => state.appointments.list);
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{t("appointments.list")}</h3>
      {appointments.length === 0 ? (
        <p>{t("appointments.noAppointments")}</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("appointments.patient")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("appointments.doctor")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("appointments.date")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("appointments.time")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("appointments.reason")}
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                {t("appointments.actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.patientName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.doctorName}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.date}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.time}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.reason}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <button
                    onClick={() => dispatch(deleteAppointment(appointment.id))}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ff6b6b",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {t("appointments.delete")}
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

export default AppointmentList;
