import React, { useEffect, useState } from "react"; // NEW
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
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const filteredPatients = patients.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  if (error) {
    return <p className="text-red-600 mb-4">Error: {error}</p>;
  }

  return (
    <div>
      <div className="relative mb-4">
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
          placeholder={t("patients.search")}
          className="w-5xl p-2 pl-9 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredPatients.length === 0 && !loading ? (
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
                    className="border-b border-gray-300 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold"
                  >
                    {t(`patients.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 dark:hover:[background-color:oklch(20.5%_0_0)]"
                >
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
                    {patient.firstName}
                  </td>
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
                    {patient.lastName}
                  </td>
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
                    {patient.email}
                  </td>
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
                    {patient.contact}
                  </td>
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
                    {patient.age}
                  </td>
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
                    {patient.address}
                  </td>
                  <td className="border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]">
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
