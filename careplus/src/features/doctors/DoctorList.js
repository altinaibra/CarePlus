import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchDoctors, deleteDoctorAsync } from "./doctorsSlice";

const DoctorList = () => {
  const { t } = useTranslation();
  const doctors = useSelector((state) => state.doctors.list);
  const loading = useSelector((state) => state.doctors.loading);
  const error = useSelector((state) => state.doctors.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{t("doctors.list")}</h3>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      {/* {loading && <p className="text-gray-600">{t("sidebar.loading")}</p>} */}
      {doctors.length === 0 && !loading ? (
        <p className="text-gray-600 dark:text-gray-300">
          {t("doctors.noDoctors")}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-gray-900 dark:text-gray-100">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                  {t("doctors.name")}
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                  {t("doctors.speciality")}
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                  {t("doctors.email")}
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                  {t("doctors.phone")}
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                  {t("doctors.license")}
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left font-semibold">
                  {t("doctors.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {doctor.name}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {doctor.speciality}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {doctor.email}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {doctor.phone}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    {doctor.licenseNumber}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">
                    <button
                      onClick={() => dispatch(deleteDoctorAsync(doctor.id))}
                      className="px-3 py-1 bg-red-500 text-white border-0 rounded cursor-pointer hover:bg-red-600 transition text-sm"
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
