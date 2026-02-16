import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAppointments, deleteAppointmentAsync } from "./appointmentsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Appointment as ApiAppointment } from "../../app/api";

interface Appointment {
  id: number | string;
  patientId: number | string;
  doctorId: number | string;
  date: string;
  time: string;
  reason: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const AppointmentList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const apiAppointments = useSelector(
    (state: RootState) => state.appointments.list,
  ) as ApiAppointment[];

  const loading = useSelector((state: RootState) => state.appointments.loading);
  const error = useSelector((state: RootState) => state.appointments.error);

  const appointments: Appointment[] = apiAppointments.map((a) => {
    const [datePart, timePart] = a.AppointmentDate.split("T");
    return {
      id: a.id,
      patientId: a.PatientId,
      doctorId: a.DoctorId,
      date: datePart,
      time: timePart?.substring(0, 5) || "",
      reason: a.Reason,
      status: a.Status,
    };
  });

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div>
      <h3>{t("appointments.list")}</h3>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

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
                  {appointment.patientId}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {appointment.doctorId}
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
                    className="px-3 py-1 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white rounded cursor-pointer hover:bg-slate-800 transition text-sm"
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
