import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../app/api";
import { useSnackbar } from "../../ui/SnackbarContext";
import { FaCog } from "react-icons/fa";
import Printers from "./Printers"; // import your existing Printers component

const settingsOptions = [
  {
    titleKey: "settingsPage.printers",
    descriptionKey: "settingsPage.description",
    modal: "printers",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
  },
  {
    titleKey: "settingsPage.changePassword",
    descriptionKey: "settingsPage.passwordDescription",
    modal: "changePassword",
    color: "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]",
  },
];

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [activeModal, setActiveModal] = useState<
    "printers" | "changePassword" | null
  >(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpenModal = (modal: "printers" | "changePassword") => {
    setActiveModal(modal);

    if (modal === "changePassword") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    }
  };

  const handleCloseModal = () => setActiveModal(null);

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
      handleCloseModal();
    } catch (err) {
      showSnackbar(t("settingsPage.failedToChangePassword"), "error");
    }
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="flex items-center text-2xl font-bold mb-6 gap-2">
        <FaCog
          className="text-gray-700 dark:text-[oklch(47.6%_0.114_61.907)]"
          size={24}
        />
        {t("settings.Settings")}
      </h2>

      <div className="flex flex-col gap-6">
        {settingsOptions.map((option) => (
          <button
            key={option.titleKey}
            onClick={() =>
              handleOpenModal(option.modal as "printers" | "changePassword")
            }
            className="block text-left p-5 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg shadow hover:shadow-lg transition"
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

      {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 flex z-50">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          />

          {/* Modal content */}
          <div
            className={`ml-auto w-[400px] h-full bg-white dark:[background-color:oklch(20.5%_0_0)] shadow-xl transform transition-transform duration-300 ${
              activeModal ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 h-full overflow-y-auto">
              {activeModal === "changePassword" && (
                <>
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

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={handleCloseModal}
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
                </>
              )}

              {activeModal === "printers" && <Printers />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
