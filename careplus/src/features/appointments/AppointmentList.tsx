import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchAppointments, deleteAppointmentAsync } from "./appointmentsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { Appointment as ApiAppointment } from "../../app/api";
import { Doctor } from "../doctors/doctorsSlice";
import type { PatientWithContact as Patient } from "../patients/types";

const AppointmentList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const apiAppointments = useSelector(
    (state: RootState) => state.appointments.list,
  ) as ApiAppointment[];

  const doctors = useSelector(
    (state: RootState) => state.doctors.list,
  ) as Doctor[];
  const patients = useSelector(
    (state: RootState) => state.patients.list,
  ) as Patient[];

  const loading = useSelector((state: RootState) => state.appointments.loading);
  const error = useSelector((state: RootState) => state.appointments.error);

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
    <div>
      <h3 className="text-lg font-bold mb-4">{t("appointments.list")}</h3>

      {error && <p className="text-red-600 mb-4">Error: {error}</p>}

      {appointments.length === 0 && !loading ? (
        <p className="text-gray-600 dark:text-gray-300">
          {t("appointments.noAppointments")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:[background-color:oklch(20.5%_0_0)]">
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("appointments.patient")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("appointments.doctor")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("appointments.date")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("appointments.time")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("appointments.reason")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("appointments.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 dark:hover:[background-color:oklch(20.5%_0_0)]"
                >
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {appointment.patientName}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {appointment.doctorName}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {appointment.date}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {appointment.time}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {appointment.reason}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    <button
                      onClick={() =>
                        dispatch(deleteAppointmentAsync(appointment.id))
                      }
                      className="px-3 py-1 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white border-0 rounded cursor-pointer hover:bg-slate-800 transition text-sm"
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
