import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchDoctors, deleteDoctorAsync } from "./doctorsSlice";
import { RootState, AppDispatch } from "../../app/store";
import { FaTrash } from "react-icons/fa";
import styles from "../../styles/DoctorListStyles";

const DoctorList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const doctors = useSelector((state: RootState) => state.doctors.list);
  const loading = useSelector((state: RootState) => state.doctors.loading);
  const error = useSelector((state: RootState) => state.doctors.error);

  const [searchText, setSearchText] = useState("");
  const [expandedIds, setExpandedIds] = useState<number[]>([]); // mobile expansion

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const speciality = doctor.speciality?.toLowerCase() || "";
    return (
      fullName.includes(searchText.toLowerCase()) ||
      speciality.includes(searchText.toLowerCase())
    );
  });

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className={styles.container}>
      {/* Search input */}
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
          placeholder={t("doctors.search") || "Search..."}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-5xl p-2 pl-9 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-700"
        />
      </div>

      {error && <p className={styles.errorText}>Error: {error}</p>}

      {filteredDoctors.length === 0 && !loading ? (
        <p className={styles.emptyText}>{t("doctors.noDoctors")}</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className={styles.table}>
              <thead>
                <tr className={styles.theadRow}>
                  {[
                    "no",
                    "firstName",
                    "lastName",
                    "speciality",
                    "email",
                    "phone",
                    "license",
                    "actions",
                  ].map((key) => (
                    <th key={key} className={styles.th}>
                      {t(`doctors.${key}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor, idx) => (
                  <tr key={doctor.id} className={styles.trHover}>
                    <td className={styles.td}>#{idx + 1}</td>
                    <td className={styles.td}>{doctor.firstName}</td>
                    <td className={styles.td}>{doctor.lastName}</td>
                    <td className={styles.td}>{doctor.speciality}</td>
                    <td className={styles.td}>{doctor.email}</td>
                    <td className={styles.td}>{doctor.phone}</td>
                    <td className={styles.td}>{doctor.licenseNumber}</td>
                    <td className={styles.td}>
                      <button
                        onClick={() => dispatch(deleteDoctorAsync(doctor.id))}
                        className={styles.deleteButton}
                      >
                        {t("doctors.delete")}
                        <FaTrash className="text-sm" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden flex flex-col gap-2">
            {filteredDoctors.map((doctor, idx) => (
              <div
                key={doctor.id}
                className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg p-3 bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition-all duration-300"
              >
                <div
                  className="flex justify-between items-center cursor-pointer font-semibold"
                  onClick={() => toggleExpand(doctor.id)}
                >
                  <span>#{idx + 1}</span>
                  <span>
                    {doctor.firstName} {doctor.lastName}
                  </span>
                  <span>{expandedIds.includes(doctor.id) ? "▲" : "▼"}</span>
                </div>
                <div
                  className={`mt-2 text-sm space-y-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    expandedIds.includes(doctor.id) ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p>
                    {t("doctors.speciality")}: {doctor.speciality}
                  </p>
                  <p>
                    {t("doctors.email")}: {doctor.email}
                  </p>
                  <p>
                    {t("doctors.phone")}: {doctor.phone}
                  </p>
                  <p>
                    {t("doctors.license")}: {doctor.licenseNumber}
                  </p>
                  <button
                    onClick={() => dispatch(deleteDoctorAsync(doctor.id))}
                    className={styles.deleteButton}
                  >
                    {t("doctors.delete")} <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorList;
