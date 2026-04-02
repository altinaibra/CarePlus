import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { NotificationSettingsStyles } from "../../../styles/NotificationSettingsStyles";
import { FaBell } from "react-icons/fa";
import { notificationsAPI, SystemNotification } from "../../../app/settingsApi";

const NotificationSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const role = useMemo(
    () => (localStorage.getItem("userRole") || "").toLowerCase(),
    [],
  );
  const isAdmin = role === "admin" || role === "administrator";
  const canView = isAdmin || role === "doctor" || role === "nurse";

  const [rules, setRules] = useState<SystemNotification[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const loadNotifications = useCallback(async () => {
    if (!canView) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await notificationsAPI.getAll();
      setRules(res.data);
    } catch {
      showSnackbar("Failed to load notifications", "error");
    } finally {
      setLoading(false);
    }
  }, [canView, showSnackbar]);

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  const addRule = async () => {
    if (!isAdmin) {
      showSnackbar("Only administrators can add notifications", "error");
      return;
    }

    if (!title) {
      showSnackbar(t("settingsPage.fillAllFields"), "error");
      return;
    }

    try {
      const res = await notificationsAPI.create(title.trim());
      setRules((prev) => [res.data, ...prev]);
      setTitle("");
      showSnackbar(t("settingsPage.notificationAdded"), "success");
    } catch {
      showSnackbar("Failed to add notification", "error");
    }
  };

  return (
    <div className={NotificationSettingsStyles.container}>
      <div className={NotificationSettingsStyles.headerWrapper}>
        <h2
          className={`${NotificationSettingsStyles.headerTitle} flex items-center gap-2`}
        >
          <FaBell className="text-primary dark:text-white" />
          {t("settingsPage.notifications")}
        </h2>
        <p className={NotificationSettingsStyles.headerDescription}>
          {t("settingsPage.notificationsDescription")}
        </p>
      </div>

      {isAdmin && (
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
      )}

      {!canView && (
        <p className={NotificationSettingsStyles.noRulesText}>
          You do not have access to notifications.
        </p>
      )}

      <div className={NotificationSettingsStyles.rulesList}>
        {loading ? (
          <p className={NotificationSettingsStyles.noRulesText}>Loading...</p>
        ) : rules.length === 0 ? (
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
                    {new Date(rule.createdAt).toLocaleString()} •{" "}
                    {rule.createdBy}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;
