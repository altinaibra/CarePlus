import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { authAPI } from "../../../app/api";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { ChangePasswordStyles } from "../../../styles/ChangePasswordStyles";
import { FaLock } from "react-icons/fa";

type Props = {
  onClose: () => void;
};

const ChangePassword: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showSnackbar(t("settingsPage.passwordsDontMatch"), "error");
      return;
    }

    try {
      const username = localStorage.getItem("username") || "";
      await authAPI.changePassword({ username, currentPassword, newPassword });
      showSnackbar(t("settingsPage.passwordChangedSuccessfully"), "success");
      onClose();
    } catch {
      showSnackbar(t("settingsPage.failedToChangePassword"), "error");
    }
  };

  return (
    <div className={ChangePasswordStyles.container}>
      <div className={ChangePasswordStyles.content}>
        <h2
          className={`${ChangePasswordStyles.header} flex items-center gap-2`}
        >
          <FaLock className="text-primary dark:text-white" />
          {t("settingsPage.changePassword")}
        </h2>
        {error && <p className={ChangePasswordStyles.errorText}>{error}</p>}

        <input
          type="password"
          placeholder={t("settingsPage.currentPassword")}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={ChangePasswordStyles.input}
        />
        <input
          type="password"
          placeholder={t("settingsPage.newPassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={ChangePasswordStyles.input}
        />
        <input
          type="password"
          placeholder={t("settingsPage.confirmPassword")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={ChangePasswordStyles.input}
        />
      </div>

      <div className={ChangePasswordStyles.footer}>
        <button onClick={onClose} className={ChangePasswordStyles.cancelButton}>
          {t("settingsPage.cancel")}
        </button>
        <button
          onClick={handleSubmit}
          className={ChangePasswordStyles.saveButton}
        >
          {t("settingsPage.save")}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
