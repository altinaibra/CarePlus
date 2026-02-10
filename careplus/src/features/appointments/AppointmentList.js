import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAppointments, deleteAppointmentAsync } from "./appointmentsSlice";

const AppointmentList = () => {
  const { t } = useTranslation();
  const appointments = useSelector((state) => state.appointments.list);
  const loading = useSelector((state) => state.appointments.loading);
  const error = useSelector((state) => state.appointments.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div>
      <h3>{t("appointments.list")}</h3>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {loading && <p>{t("sidebar.loading")}</p>}
      {appointments.length === 0 && !loading ? (
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
                    onClick={() =>
                      dispatch(deleteAppointmentAsync(appointment.id))
                    }
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
