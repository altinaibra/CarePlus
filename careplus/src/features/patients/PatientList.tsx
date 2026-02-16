import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchPatients, deletePatientAsync } from "./patientsSlice";
import type { RootState, AppDispatch } from "../../app/store";
import type { PatientWithContact } from "./types";

const PatientList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const patients = useSelector(
    (state: RootState) => state.patients.list,
  ) as PatientWithContact[];
  const loading = useSelector((state: RootState) => state.patients.loading);
  const error = useSelector((state: RootState) => state.patients.error);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  if (error) {
    return <p className="text-red-600 mb-4">Error: {error}</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{t("patients.list")}</h3>

      {patients.length === 0 && !loading ? (
        <p className="text-gray-600 dark:text-gray-300">
          {t("patients.noPatients")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:[background-color:oklch(20.5%_0_0)]">
                {[
                  "firstName",
                  "lastName",
                  "email",
                  "contact",
                  "age",
                  "address",
                  "actions",
                ].map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold"
                  >
                    {t(`patients.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 dark:hover:[background-color:oklch(20.5%_0_0)]"
                >
                  <td className="border p-3">{patient.firstName}</td>
                  <td className="border p-3">{patient.lastName}</td>
                  <td className="border p-3">{patient.email}</td>
                  <td className="border p-3">{patient.contact}</td>
                  <td className="border p-3">{patient.age}</td>
                  <td className="border p-3">{patient.address}</td>
                  <td className="border p-3">
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
