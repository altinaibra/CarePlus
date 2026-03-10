import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { authAPI } from "../../../app/api";
import { useSnackbar } from "../../../ui/SnackbarContext";

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

      await authAPI.changePassword({
        username,
        currentPassword,
        newPassword,
      });

      showSnackbar(t("settingsPage.passwordChangedSuccessfully"), "success");
      onClose();
    } catch {
      showSnackbar(t("settingsPage.failedToChangePassword"), "error");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {t("settingsPage.changePassword")}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="password"
          placeholder={t("settingsPage.currentPassword")}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />

        <input
          type="password"
          placeholder={t("settingsPage.newPassword")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />

        <input
          type="password"
          placeholder={t("settingsPage.confirmPassword")}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border rounded border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] hover:bg-gray-400"
        >
          {t("settingsPage.cancel")}
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white hover:bg-blue-700"
        >
          {t("settingsPage.save")}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
