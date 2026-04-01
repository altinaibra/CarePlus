import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuditLog, auditLogsAPI } from "../../../app/settingsApi";

const AuditSettings: React.FC = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLogs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await auditLogsAPI.getAll(100);
        setRows(res.data);
      } catch {
        setError("Failed to load audit logs.");
      } finally {
        setLoading(false);
      }
    };

    void loadLogs();
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.auditLog")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.auditLogDescription")}
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {loading && (
        <p className="text-sm text-gray-600 dark:text-gray-300">Loading...</p>
      )}

      <div className="overflow-x-auto border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="text-left px-3 py-2">User</th>
              <th className="text-left px-3 py-2">Action</th>
              <th className="text-left px-3 py-2">Target</th>
              <th className="text-left px-3 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2">{row.username}</td>
                <td className="px-3 py-2">{row.action}</td>
                <td className="px-3 py-2">{row.target}</td>
                <td className="px-3 py-2">
                  {new Date(row.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditSettings;
