import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchPatients, deletePatientAsync } from "./patientsSlice";

const PatientList = () => {
  const { t } = useTranslation();
  const patients = useSelector((state) => state.patients.list);
  const loading = useSelector((state) => state.patients.loading);
  const error = useSelector((state) => state.patients.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{t("patients.list")}</h3>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {/* {loading && <p className="text-gray-600">{t("sidebar.loading")}</p>} */}
      {patients.length === 0 && !loading ? (
        <p className="text-gray-600 dark:text-gray-300">
          {t("patients.noPatients")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:[background-color:oklch(20.5%_0_0)]">
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.firstName")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.lastName")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.email")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.contact")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.age")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.address")}
                </th>
                <th className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold">
                  {t("patients.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 dark:hover:[background-color:oklch(20.5%_0_0)]"
                >
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {patient.firstName}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {patient.lastName}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {patient.email}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {patient.contact}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {patient.age}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    {patient.address}
                  </td>
                  <td className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3">
                    <button
                      onClick={() => dispatch(deletePatientAsync(patient.id))}
                      className="px-3 py-1 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white border-0 rounded cursor-pointer transition text-sm"
                    >
                      {t("patients.delete")}
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

export default PatientList;
