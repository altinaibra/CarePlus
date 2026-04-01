import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchPatients, deletePatientAsync } from "./patientsSlice";
import type { RootState, AppDispatch } from "../../app/store";
import type { PatientWithContact } from "./types";
import { FaTrash } from "react-icons/fa";
import { PatientListStyles } from "../../styles/PatientListStyles";

const PatientList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const patients = useSelector(
    (state: RootState) => state.patients.list,
  ) as PatientWithContact[];
  const loading = useSelector((state: RootState) => state.patients.loading);
  const error = useSelector((state: RootState) => state.patients.error);
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<number[]>([]); // for mobile dropdowns

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const filteredPatients = patients.filter((p) => {
    const fullName = `${p.firstName} ${p.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (error) {
    return <p className="text-red-600 mb-4">Error: {error}</p>;
  }

  return (
    <div className={PatientListStyles.container}>
      <div className={PatientListStyles.searchWrapper}>
        <span className={PatientListStyles.searchIcon}>
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
          className={PatientListStyles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}
      {filteredPatients.length > 0 && (
        <div className={PatientListStyles.tableWrapper}>
          <table className={PatientListStyles.table}>
            <thead>
              <tr className={PatientListStyles.theadRow}>
                {[
                  "no",
                  "firstName",
                  "lastName",
                  "email",
                  "contact",
                  "age",
                  "address",
                  "actions",
                ].map((key) => (
                  <th key={key} className={PatientListStyles.th}>
                    {t(`patients.${key}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={patient.id} className={PatientListStyles.tbodyRow}>
                  <td className={PatientListStyles.td}>#{index + 1}</td>
                  <td className={PatientListStyles.td}>{patient.firstName}</td>
                  <td className={PatientListStyles.td}>{patient.lastName}</td>
                  <td className={PatientListStyles.td}>{patient.email}</td>
                  <td className={PatientListStyles.td}>{patient.contact}</td>
                  <td className={PatientListStyles.td}>{patient.age}</td>
                  <td className={PatientListStyles.td}>{patient.address}</td>
                  <td className={PatientListStyles.td}>
                    <button
                      onClick={() => dispatch(deletePatientAsync(patient.id))}
                      className={PatientListStyles.deleteBtn}
                    >
                      {t("patients.delete")}
                      <FaTrash className="text-sm" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Cards */}
      <div className={PatientListStyles.mobileListWrapper}>
        {filteredPatients.map((patient, index) => (
          <div key={patient.id} className={PatientListStyles.mobileCard}>
            <div
              className={PatientListStyles.mobileCardHeader}
              onClick={() => toggleExpand(patient.id)}
            >
              <span>#{index + 1}</span>
              <span>
                {patient.firstName} {patient.lastName}
              </span>
            </div>
           <div
            className={`${PatientListStyles.mobileCardBody} ${
              expandedIds.includes(patient.id)
                ? PatientListStyles.mobileCardBodyExpanded
                : ""
            }`}
          >
            <p>Email: {patient.email}</p>
            <p>Contact: {patient.contact}</p>
            <p>Age: {patient.age}</p>
            <p>Address: {patient.address}</p>
            <button
              onClick={() => dispatch(deletePatientAsync(patient.id))}
              className={PatientListStyles.deleteBtn}
            >
              {t("patients.delete")}
              <FaTrash className="text-sm" />
            </button>
          </div>
          </div>
        ))}
      </div>

      {filteredPatients.length === 0 && !loading && (
        <p className={PatientListStyles.noPatients}>
          {t("patients.noPatients")}
        </p>
      )}
    </div>
  );
};

export default PatientList;
