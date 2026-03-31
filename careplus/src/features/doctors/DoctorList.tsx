import React, { useEffect, useState } from "react"; // + useState
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchDoctors, deleteDoctorAsync } from "./doctorsSlice";
import { RootState, AppDispatch } from "../../app/store";
import styles from "../../styles/DoctorListStyles";
import { FaTrash } from "react-icons/fa";

const DoctorList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const doctors = useSelector((state: RootState) => state.doctors.list);
  const loading = useSelector((state: RootState) => state.doctors.loading);
  const error = useSelector((state: RootState) => state.doctors.error);

  const [searchText, setSearchText] = useState("");

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

  return (
    <div className={styles.container}>
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
          className="
            w-5xl
            p-2 pl-9
            bg-white dark:[background-color:oklch(20.5%_0_0)]
            border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
            text-gray-900 dark:text-gray-100
            rounded
            focus:outline-none
            focus:ring-2
            focus:ring-slate-700
          "
        />
      </div>

      {error && <p className={styles.errorText}>Error: {error}</p>}

      {filteredDoctors.length === 0 && !loading ? (
        <p className={styles.emptyText}>{t("doctors.noDoctors")}</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.theadRow}>
                <th className={styles.th}>{t("doctors.firstName")}</th>
                <th className={styles.th}>{t("doctors.lastName")}</th>
                <th className={styles.th}>{t("doctors.speciality")}</th>
                <th className={styles.th}>{t("doctors.email")}</th>
                <th className={styles.th}>{t("doctors.phone")}</th>
                <th className={styles.th}>{t("doctors.license")}</th>
                <th className={styles.th}>{t("doctors.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className={styles.trHover}>
                  <td className={styles.td}>{doctor.firstName}</td>
                  <td className={styles.td}>{doctor.lastName}</td>
                  <td className={styles.td}>{doctor.speciality}</td>
                  <td className={styles.td}>{doctor.email}</td>
                  <td className={styles.td}>{doctor.phone}</td>
                  <td className={styles.td}>{doctor.licenseNumber}</td>
                  <td className={styles.td}>
                    <button
                      onClick={() => dispatch(deleteDoctorAsync(doctor.id))}
                      className="flex items-center gap-1 px-3 py-1 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white border-0 rounded cursor-pointer transition text-sm"
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
      )}
    </div>
  );
};

export default DoctorList;
