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
        <p className="text-gray-600">{t("patients.noPatients")}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  {t("patients.name")}
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  {t("patients.email")}
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  {t("patients.phone")}
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  {t("patients.age")}
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  {t("patients.address")}
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  {t("patients.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{patient.name}</td>
                  <td className="border border-gray-300 p-3">
                    {patient.email}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {patient.phone}
                  </td>
                  <td className="border border-gray-300 p-3">{patient.age}</td>
                  <td className="border border-gray-300 p-3">
                    {patient.address}
                  </td>
                  <td className="border border-gray-300 p-3">
                    <button
                      onClick={() => dispatch(deletePatientAsync(patient.id))}
                      className="px-3 py-1 bg-red-500 text-white border-0 rounded cursor-pointer hover:bg-red-600 transition text-sm"
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
