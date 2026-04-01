// AppointmentList.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAppointments, deleteAppointmentAsync } from "./appointmentsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Appointment as ApiAppointment } from "../../app/api";
import { FaFilter, FaTrash } from "react-icons/fa";
import styles from "../../styles/AppointmentListStyles";

type DisplayAppointment = {
  id: ApiAppointment["id"];
  patientName: string;
  doctorName: string;
  date: string;
  rawDate: string;
  time: string;
  reason: string;
  status: string;
};

type AppointmentId = ApiAppointment["id"];

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

  const [filterDate, setFilterDate] = useState("");
  const [searchText, setSearchText] = useState("");
  const [expandedIds, setExpandedIds] = useState<AppointmentId[]>([]);

  const toggleExpand = (id: AppointmentId) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  const appointments = useMemo(
    () =>
      apiAppointments.map((a) => {
        const dateTime =
          (a as any).AppointmentDate ?? (a as any).appointmentDate ?? "";
        const [datePart, timePart] = dateTime.split("T");

        let formattedDate = "";
        if (datePart) {
          const d = new Date(datePart);
          formattedDate = `${String(d.getDate()).padStart(2, "0")}.${String(
            d.getMonth() + 1,
          ).padStart(2, "0")}.${d.getFullYear()}`;
        }

        return {
          id: a.id,
          patientName: a.patient
            ? `${a.patient.firstName} ${a.patient.lastName}`
            : "Unknown",
          doctorName: a.doctor
            ? `Dr. ${a.doctor.firstName} ${a.doctor.lastName}`
            : "Unknown",
          date: formattedDate,
          rawDate: datePart || "",
          time: timePart?.substring(0, 5) || "",
          reason: (a as any).Reason ?? (a as any).reason ?? "",
          status: (a as any).Status ?? (a as any).status ?? "Scheduled",
        };
      }),
    [apiAppointments],
  );

  const [displayedAppointments, setDisplayedAppointments] = useState<
    DisplayAppointment[]
  >([]);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedAppointments(appointments);
  }, [appointments]);

  const handleFilter = () => {
    const filtered = appointments
      .filter((a) => (filterDate ? a.rawDate === filterDate : true))
      .filter((a) =>
        searchText
          ? a.patientName.toLowerCase().includes(searchText.toLowerCase()) ||
            a.doctorName.toLowerCase().includes(searchText.toLowerCase()) ||
            a.reason.toLowerCase().includes(searchText.toLowerCase())
          : true,
      );
    setDisplayedAppointments(filtered);
  };

  const handleClear = () => {
    setFilterDate("");
    setSearchText("");
    setDisplayedAppointments(appointments);
  };

  return (
    <div className={styles.container}>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-sm min-w-[180px]">
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 4a6 6 0 016 6c0 1.39-.47 2.67-1.26 3.68l4.29 4.29-1.42 1.42-4.29-4.29A6 6 0 1110 4z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder={t("appointments.search") || "Search..."}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            className="w-full p-2 pl-9 bg-white dark:bg-[oklch(20.5%_0_0)] border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-slate-700"
          />
        </div>

        <input
          type="date"
          className="p-2 border border-gray-300 dark:border-[oklch(47.6%_0.114_61.907)] rounded bg-white dark:bg-[oklch(20.5%_0_0)]"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {(filterDate || searchText) && (
          <button
            onClick={handleClear}
            className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-[oklch(25%_0_0)]"
          >
            {t("appointments.clear")}
          </button>
        )}

        <button
          onClick={handleFilter}
          className="px-3 py-2 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white rounded flex items-center gap-2"
        >
          {t("appointments.filter")} <FaFilter />
        </button>
      </div>

      {error && <p className={styles.errorText}>Error: {error}</p>}

      <div className="hidden sm:block">
        {displayedAppointments.length === 0 && !loading ? (
          <p className={styles.emptyText}>{t("appointments.noAppointments")}</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  <th className={styles.th}>{t("appointments.no")}</th>
                  <th className={styles.th}>{t("appointments.patient")}</th>
                  <th className={styles.th}>{t("appointments.doctor")}</th>
                  <th className={styles.th}>{t("appointments.date")}</th>
                  <th className={styles.th}>{t("appointments.time")}</th>
                  <th className={styles.th}>{t("appointments.reason")}</th>
                  <th className={styles.th}>{t("appointments.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {displayedAppointments.map((a, i) => (
                  <tr key={a.id} className={styles.trHover}>
                    <td className={styles.td}>#{i + 1}</td>
                    <td className={styles.td}>{a.patientName}</td>
                    <td className={styles.td}>{a.doctorName}</td>
                    <td className={styles.td}>{a.date}</td>
                    <td className={styles.td}>{a.time}</td>
                    <td className={styles.td}>{a.reason}</td>
                    <td className={styles.td}>
                      <button
                        onClick={() => dispatch(deleteAppointmentAsync(a.id))}
                        className={`${styles.deleteButton} flex items-center gap-1`}
                      >
                        {t("appointments.delete")}
                        <FaTrash className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="sm:hidden flex flex-col gap-2">
        {displayedAppointments.map((a, i) => (
          <div
            key={a.id}
            className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg p-3 bg-white dark:bg-[oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition-all duration-300"
          >
            <div
              onClick={() => toggleExpand(a.id)}
              className="flex justify-between items-center cursor-pointer font-semibold"
            >
              <span>#{i + 1}</span>
              <span>
                {a.patientName} / {a.doctorName}
              </span>
            </div>
            <div
              className={`mt-2 text-sm space-y-1 overflow-hidden transition-[max-height] duration-300 ${
                expandedIds.includes(a.id) ? "max-h-96" : "max-h-0"
              }`}
            >
              <p>
                {t("appointments.date")} {a.date}
              </p>
              <p>
                {t("appointments.time")} {a.time}
              </p>
              <p>
                {t("appointments.reason")} {a.reason}
              </p>
              <p>
                {t("appointments.status")} {a.status}
              </p>
              <button
                onClick={() => dispatch(deleteAppointmentAsync(a.id))}
                className="flex items-center gap-1 px-3 py-1 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded text-sm"
              >
                {t("appointments.delete")} <FaTrash className="text-sm" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;
