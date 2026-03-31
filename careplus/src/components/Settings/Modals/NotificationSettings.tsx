import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";

type AlertRule = {
  id: number;
  title: string;
  enabled: boolean;
};

const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [rules, setRules] = useState<AlertRule[]>([]);
  const [title, setTitle] = useState("");

  const addRule = () => {
    if (!title) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    setRules((prev) => [...prev, { id: Date.now(), title, enabled: true }]);
    setTitle("");
    showSnackbar(t("settingsPage.notificationAdded"), "success");
  };

  const toggleRule = (id: number) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule,
      ),
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {t("settingsPage.notifications")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("settingsPage.notificationsDescription")}
        </p>
      </div>

      <div className="grid gap-3 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("settingsPage.notificationRule")}
          className="w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
        />
        <button
          onClick={addRule}
          className="px-4 py-2 rounded bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white"
        >
          {t("settingsPage.addNotificationRule")}
        </button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            {t("settingsPage.noNotificationRules")}
          </p>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className="p-3 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]"
            >
              <div className="flex justify-between items-center gap-3">
                <div>
                  <h3 className="font-semibold">{rule.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {rule.enabled
                      ? t("settingsPage.enabled")
                      : t("settingsPage.disabled")}
                  </p>
                </div>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  {rule.enabled
                    ? t("settingsPage.disable")
                    : t("settingsPage.enable")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
