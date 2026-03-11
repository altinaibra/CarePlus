import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchDoctors, deleteDoctorAsync } from "./doctorsSlice";
import { RootState, AppDispatch } from "../../app/store";
import styles from "../../styles/DoctorListStyles";

const DoctorList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const doctors = useSelector((state: RootState) => state.doctors.list);
  const loading = useSelector((state: RootState) => state.doctors.loading);
  const error = useSelector((state: RootState) => state.doctors.error);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {error && <p className={styles.errorText}>Error: {error}</p>}
      {doctors.length === 0 && !loading ? (
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
              {doctors.map((doctor) => (
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
                      className={styles.deleteButton}
                    >
                      {t("doctors.delete")}
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
