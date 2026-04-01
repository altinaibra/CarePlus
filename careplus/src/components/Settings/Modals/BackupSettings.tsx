import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { backupSettingsAPI } from "../../../app/settingsApi";
import { BackupStyles } from "../../../styles/BackupStyles";

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
    <div className={BackupStyles.container}>
      <div>
        <h2 className={BackupStyles.title}>
          {t("settingsPage.backupRestore")}
        </h2>
        <p className={BackupStyles.description}>
          {t("settingsPage.backupRestoreDescription")}
        </p>
      </div>

      {status === "loading" && (
        <p className={BackupStyles.loading}>{t("settingsPage.loading")}</p>
      )}

      {status === "saved" && (
        <p className={BackupStyles.success}>
          {t("settingsPage.save")} {t("settingsPage.success")}
        </p>
      )}

      {status === "error" && (
        <p className={BackupStyles.error}>
          {t("settingsPage.save")} {t("settingsPage.error")}
        </p>
      )}

      <div className={BackupStyles.card}>
        <label className={BackupStyles.checkboxLabel}>
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
          className={BackupStyles.select}
        >
          <option value="daily">{t("settingsPage.daily")}</option>
          <option value="weekly">{t("settingsPage.weekly")}</option>
          <option value="monthly">{t("settingsPage.monthly")}</option>
        </select>

        <div className={BackupStyles.buttonsRow}>
          <button
            onClick={runManualBackup}
            className={BackupStyles.primaryButton}
          >
            {t("settingsPage.manualBackup")}
          </button>

          <button className={BackupStyles.secondaryButton}>
            {t("settingsPage.exportDatabase")}
          </button>

          <button className={BackupStyles.secondaryButton}>
            {t("settingsPage.restorePoint")}
          </button>
        </div>

        {lastBackup && (
          <p className={BackupStyles.lastBackupText}>
            {t("settingsPage.lastBackup")}: {lastBackup}
          </p>
        )}

        <button onClick={saveSettings} className={BackupStyles.primaryButton}>
          {t("settingsPage.save")}
        </button>
      </div>
    </div>
  );
};

export default BackupSettings;
