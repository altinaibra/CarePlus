import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { NotificationSettingsStyles } from "../../../styles/NotificationSettingsStyles";

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
    <div className={NotificationSettingsStyles.container}>
      <div className={NotificationSettingsStyles.headerWrapper}>
        <h2 className={NotificationSettingsStyles.headerTitle}>
          {t("settingsPage.notifications")}
        </h2>
        <p className={NotificationSettingsStyles.headerDescription}>
          {t("settingsPage.notificationsDescription")}
        </p>
      </div>

      <div className={NotificationSettingsStyles.inputGrid}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("settingsPage.notificationRule")}
          className={NotificationSettingsStyles.input}
        />
        <button
          onClick={addRule}
          className={NotificationSettingsStyles.addButton}
        >
          {t("settingsPage.addNotificationRule")}
        </button>
      </div>

      <div className={NotificationSettingsStyles.rulesList}>
        {rules.length === 0 ? (
          <p className={NotificationSettingsStyles.noRulesText}>
            {t("settingsPage.noNotificationRules")}
          </p>
        ) : (
          rules.map((rule) => (
            <div key={rule.id} className={NotificationSettingsStyles.ruleItem}>
              <div className={NotificationSettingsStyles.ruleContent}>
                <div className={NotificationSettingsStyles.ruleInfo}>
                  <h3 className={NotificationSettingsStyles.ruleTitle}>
                    {rule.title}
                  </h3>
                  <p className={NotificationSettingsStyles.ruleStatus}>
                    {rule.enabled
                      ? t("settingsPage.enabled")
                      : t("settingsPage.disabled")}
                  </p>
                </div>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={NotificationSettingsStyles.toggleButton}
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
