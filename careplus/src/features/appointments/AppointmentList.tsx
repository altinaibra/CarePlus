import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAppointments, deleteAppointmentAsync } from "./appointmentsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Appointment as ApiAppointment } from "../../app/api";
import styles from "../../styles/AppointmentListStyles";

const AppointmentList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const apiAppointments = useSelector<RootState, ApiAppointment[]>(
    (state) => state.appointments.list,
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.appointments.loading,
  );
  const error = useSelector<RootState, string | null>(
    (state) => state.appointments.error,
  );

  const [filterDate, setFilterDate] = useState<string>("");

  const appointments = apiAppointments.map((a) => {
    const dateTime =
      (a as any).AppointmentDate ?? (a as any).appointmentDate ?? "";
    const [datePart, timePart] = dateTime.split("T");

    return {
      id: a.id,
      patientName: a.patient
        ? `${a.patient.firstName} ${a.patient.lastName}`
        : "Unknown",
      doctorName: a.doctor
        ? `Dr. ${a.doctor.firstName} ${a.doctor.lastName}`
        : "Unknown",
      date: datePart || "",
      time: timePart?.substring(0, 5) || "",
      reason: (a as any).Reason ?? (a as any).reason ?? "",
      status: (a as any).Status ?? (a as any).status ?? "Scheduled",
    };
  });

  const filteredAppointments = filterDate
    ? appointments.filter((a) => a.date === filterDate)
    : appointments;

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  return (
    <div className={styles.container}>

      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">
          {t("appointments.filterByDate")}:
        </label>
        <input
          type="date"
          className="p-2 custom-date-input bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white rounded hover:bg-gray-500"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {filterDate && (
          <button
            className="px-3 py-1 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white rounded hover:bg-gray-500 rounded"
            onClick={() => setFilterDate("")}
          >
            {t("appointments.clear")}
          </button>
        )}
      </div>

      {error && <p className={styles.errorText}>Error: {error}</p>}

      {filteredAppointments.length === 0 && !loading ? (
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
              {filteredAppointments.map((appointment) => (
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
