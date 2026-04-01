import React from "react";
import { useTranslation } from "react-i18next";

type AuditRow = {
  id: number;
  user: string;
  action: string;
  target: string;
  timestamp: string;
};

const rows: AuditRow[] = [
  {
    id: 1,
    user: "admin",
    action: "Updated",
    target: "Department settings",
    timestamp: "2026-04-01 10:25",
  },
  {
    id: 2,
    user: "doctor.arta",
    action: "Deleted",
    target: "Patient #104",
    timestamp: "2026-04-01 09:14",
  },
  {
    id: 3,
    user: "nurse.dren",
    action: "Viewed",
    target: "Lab report #55",
    timestamp: "2026-03-31 16:47",
  },
];

const AuditSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.auditLog")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.auditLogDescription")}
        </p>
      </div>

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
                <td className="px-3 py-2">{row.user}</td>
                <td className="px-3 py-2">{row.action}</td>
                <td className="px-3 py-2">{row.target}</td>
                <td className="px-3 py-2">{row.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditSettings;
