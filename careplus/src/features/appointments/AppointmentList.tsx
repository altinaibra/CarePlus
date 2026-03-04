import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAppointments, deleteAppointmentAsync } from "./appointmentsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Appointment as ApiAppointment } from "../../app/api";
import { Doctor } from "../doctors/doctorsSlice";
import type { PatientWithContact as Patient } from "../patients/types";
import styles from "../../styles/AppointmentListStyles";

const AppointmentList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const apiAppointments = useSelector<RootState, ApiAppointment[]>(
    (state) => state.appointments.list,
  );

  const doctors = useSelector<RootState, Doctor[]>(
    (state) => state.doctors.list,
  );

  const patients = useSelector<RootState, Patient[]>(
    (state) => state.patients.list,
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.appointments.loading,
  );
  const error = useSelector<RootState, string | null>(
    (state) => state.appointments.error,
  );

  const appointments = apiAppointments.map((a) => {
    const dateTime = a.AppointmentDate || "";
    const [datePart, timePart] = dateTime.split("T");

    const patient = patients.find((p) => p.id === a.PatientId);
    const doctor = doctors.find((d) => d.id === a.DoctorId);

    return {
      id: a.id,
      patientName: patient
        ? `${patient.firstName} ${patient.lastName}`
        : "Unknown",
      doctorName: doctor ? `Dr. ${doctor.name}` : "Unknown",
      date: datePart || "",
      time: timePart?.substring(0, 5) || "",
      reason: a.Reason || "",
      status: a.Status || "Scheduled",
    };
  });

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{t("appointments.list")}</h3>

      {error && <p className={styles.errorText}>Error: {error}</p>}

      {appointments.length === 0 && !loading ? (
        <p className={styles.emptyText}>{t("appointments.noAppointments")}</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.theadRow}>
                <th className={styles.th}>{t("appointments.patient")}</th>
                <th className={styles.th}>{t("appointments.doctor")}</th>
                <th className={styles.th}>{t("appointments.date")}</th>
                <th className={styles.th}>{t("appointments.time")}</th>
                <th className={styles.th}>{t("appointments.reason")}</th>
                <th className={styles.th}>{t("appointments.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className={styles.trHover}>
                  <td className={styles.td}>{appointment.patientName}</td>
                  <td className={styles.td}>{appointment.doctorName}</td>
                  <td className={styles.td}>{appointment.date}</td>
                  <td className={styles.td}>{appointment.time}</td>
                  <td className={styles.td}>{appointment.reason}</td>
                  <td className={styles.td}>
                    <button
                      onClick={() =>
                        dispatch(deleteAppointmentAsync(appointment.id))
                      }
                      className={styles.deleteButton}
                    >
                      {t("appointments.delete")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
