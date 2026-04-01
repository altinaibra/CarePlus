import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { backupSettingsAPI } from "../../../app/settingsApi";

const BackupSettings: React.FC = () => {
  const { t } = useTranslation();
  const [autoBackup, setAutoBackup] = useState(true);
  const [interval, setInterval] = useState("daily");
  const [lastBackup, setLastBackup] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      setStatus("loading");
      try {
        const res = await backupSettingsAPI.get();
        setAutoBackup(res.data.autoBackupEnabled);
        setInterval(res.data.backupInterval || "daily");
        setLastBackup(
          res.data.lastBackupAt
            ? new Date(res.data.lastBackupAt).toLocaleString()
            : null,
        );
        setStatus("");
      } catch {
        setStatus("error");
      }
    };

    void loadSettings();
  }, []);

  const saveSettings = async () => {
    setStatus("saving");
    try {
      const res = await backupSettingsAPI.save({
        autoBackupEnabled: autoBackup,
        backupInterval: interval,
      });
      setAutoBackup(res.data.autoBackupEnabled);
      setInterval(res.data.backupInterval || "daily");
      setLastBackup(
        res.data.lastBackupAt
          ? new Date(res.data.lastBackupAt).toLocaleString()
          : null,
      );
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  const runManualBackup = async () => {
    setStatus("saving");
    try {
      const res = await backupSettingsAPI.manual();
      setLastBackup(
        res.data.lastBackupAt
          ? new Date(res.data.lastBackupAt).toLocaleString()
          : new Date().toLocaleString(),
      );
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">{t("settingsPage.backupRestore")}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("settingsPage.backupRestoreDescription")}
        </p>
      </div>
      {status === "loading" && (
        <p className="text-sm text-gray-600 dark:text-gray-300">{t("settingsPage.loading")}</p>
      )}
      {status === "saved" && <p className="text-sm text-green-600">{t("settingsPage.save")} {t("settingsPage.success")}</p>}
      {status === "error" && (
        <p className="text-sm text-red-600">{t("settingsPage.save")} {t("settingsPage.error")}</p>
      )}

      <div className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded p-4 space-y-3">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoBackup}
            onChange={(e) => setAutoBackup(e.target.checked)}
          />
          {t("settingsPage.autoBackup")}
        </label>

        <select
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="w-full border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded px-3 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)]"
        >
          <option value="daily">{t("settingsPage.daily")}</option>
          <option value="weekly">{t("settingsPage.weekly")}</option>
          <option value="monthly">{t("settingsPage.monthly")}</option>
        </select>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={runManualBackup}
            className="px-3 py-2 rounded bg-slate-700 text-white dark:[background-color:oklch(47.6%_0.114_61.907)]"
          >
            {t("settingsPage.manualBackup")}
          </button>
          <button className="px-3 py-2 rounded border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]">
            {t("settingsPage.exportDatabase")}
          </button>
          <button className="px-3 py-2 rounded border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]">
            {t("settingsPage.restorePoint")}
          </button>
        </div>

        {lastBackup && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("settingsPage.lastBackup")}: {lastBackup}
          </p>
        )}
        <button
          onClick={saveSettings}
          className="px-3 py-2 rounded bg-slate-700 text-white dark:[background-color:oklch(47.6%_0.114_61.907)]"
        >
          {t("settingsPage.save")}
        </button>
      </div>
    </div>
  );
};

export default BackupSettings;
