import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuditLog, auditLogsAPI } from "../../../app/settingsApi";
import { AuditSettingsStyles } from "../../../styles/AuditSettingsStyles";

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
    <div className={AuditSettingsStyles.container}>
      <div>
        <h2 className={AuditSettingsStyles.title}>
          {t("settingsPage.auditLog")}
        </h2>

        <p className={AuditSettingsStyles.description}>
          {t("settingsPage.auditLogDescription")}
        </p>
      </div>

      {error && <p className={AuditSettingsStyles.error}>{error}</p>}
      {loading && <p className={AuditSettingsStyles.loading}>Loading...</p>}

      <div className={AuditSettingsStyles.tableWrapper}>
        <table className={AuditSettingsStyles.table}>
          <thead className={AuditSettingsStyles.thead}>
            <tr>
              <th className={AuditSettingsStyles.th}>
                {t("settingsPage.username")}
              </th>
              <th className={AuditSettingsStyles.th}>
                {t("settingsPage.action")}
              </th>
              <th className={AuditSettingsStyles.th}>
                {t("settingsPage.target")}
              </th>
              <th className={AuditSettingsStyles.th}>
                {t("settingsPage.time")}
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={AuditSettingsStyles.rowBorder}>
                <td className={AuditSettingsStyles.td}>{row.username}</td>
                <td className={AuditSettingsStyles.td}>{row.action}</td>
                <td className={AuditSettingsStyles.td}>{row.target}</td>
                <td className={AuditSettingsStyles.td}>
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
