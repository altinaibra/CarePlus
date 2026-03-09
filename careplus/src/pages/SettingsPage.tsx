import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { authAPI } from "../app/api";

const settingsOptions = [
  {
    titleKey: "settingsPage.printers",
    descriptionKey: "settingsPage.description",
    path: "/settings/printers",
    color: "bg-green-600",
  },
  {
    titleKey: "settingsPage.changePassword",
    descriptionKey: "settingsPage.passwordDescription",
    path: "/settings/change-password",
    color: "bg-blue-600",
  },
];

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

const handleSubmit = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    setError(t("settingsPage.fillAllFields"));
    return;
  }

  if (newPassword !== confirmPassword) {
    setError(t("settingsPage.passwordsDontMatch"));
    return;
  }

  try {
    const username = localStorage.getItem("username");

    await authAPI.changePassword({
      username: username || "",
      currentPassword,
      newPassword,
    });

    setIsModalOpen(false);
  } catch (err) {
    setError("Failed to change password");
  }
};
  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{t("settings.settings")}</h2>
      <div className="flex flex-col gap-6">
        {settingsOptions.map((option) => (
          <button
            key={option.titleKey}
            onClick={() => {
              if (option.titleKey === "settingsPage.changePassword") {
                handleOpenModal();
              } else {
                window.location.href = option.path;
              }
            }}
            className="block text-left p-5 border rounded-lg shadow hover:shadow-lg transition bg-gray-200 dark:bg-gray-700"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white mb-3 ${option.color}`}
            >
              {t(option.titleKey).charAt(0)}
            </div>
            <h3 className="text-lg font-semibold mb-1">{t(option.titleKey)}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t(option.descriptionKey)}
            </p>
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {t("settingsPage.changePassword")}
            </h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="password"
              placeholder={t("settingsPage.currentPassword")}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder={t("settingsPage.newPassword")}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder={t("settingsPage.confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                {t("settingsPage.cancel")}
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                {t("settingsPage.save")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
